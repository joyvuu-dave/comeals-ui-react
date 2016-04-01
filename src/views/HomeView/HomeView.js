/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import classes from './HomeView.scss'
import { createSelector } from 'reselect'

// Actions
import { updateDescription, updateExtras, updateAutoClose, closeMeal } from '../../redux/modules/Meal'
import { updateCook1, updateCost1 } from '../../redux/modules/Bill1'
import { updateCook2, updateCost2 } from '../../redux/modules/Bill2'
import { updateCook3, updateCost3 } from '../../redux/modules/Bill3'

// Components
import DateBox from '../../components/DateBox/DateBox'
import Menu from '../../components/Menu/Menu'
import Cooks from '../../components/Cooks/Cooks'
import Signups from '../../components/Signups/Signups'
import Extra from '../../components/Extra/Extra'
import Attendees from '../../components/Attendees/Attendees'
import Guests from '../../components/Guests/Guests'

// Schemas
import type { MealSchema } from '../../redux/modules/Meal'
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { MealResidentsSchema } from '../../redux/modules/MealResidents'
import type { BillsSchema } from '../../redux/modules/bill'
import type { GuestsSchema } from '../../redux/modules/Guests'
import type { ActionsSchema } from '../../redux/modules/actions'
import type { UISchema } from '../../redux/modules/UI'

type Props = {
  meal: MealSchema,
  bills: BillsSchema,
  residents: ResidentsSchema,
  meal_residents: MealResidentsSchema,
  guests: GuestsSchema,
  actions: ActionsSchema,
  ui: UISchema
};

export class HomeView extends React.Component<void, Props, void> {
  render () {
    return (
      <main className={classes.main}>
        <section className={classes.top}>
          <section className={classes['date-and-menu']}>
            <DateBox
              meal_id={this.props.meal.id}
              date={this.props.meal.date}
              hasPrev={this.props.meal.hasPrev}
              hasNext={this.props.meal.hasNext}
              status={this.props.meal.status} />
            <Menu
              disabled={this.props.ui.menu_textarea_disabled}
              description={this.props.meal.description}
              updateDescription={this.props.actions.meal.updateDescription} />
          </section>
          <section className={classes['cooks-and-signups']}>
            <Cooks
              residents={this.props.residents}
              bills={this.props.bills}
              actions={this.props.actions.bills} />
            <Signups
              attendees={this.props.meal.attendees}
              omnivores={this.props.meal.omnivores}
              vegetarians={this.props.meal.vegetarians}
              late={this.props.meal.late} />
            <Extra
              /* Auto-Close Checkbox */
              auto_close={this.props.meal.auto_close}
              auto_close_checkbox_hidden={this.props.ui.auto_close_checkbox_hidden}
              auto_close_checkbox_disabled={this.props.ui.auto_close_checkbox_disabled}
              updateAutoClose={this.props.actions.meal.updateAutoClose}

              /* Extras Input Field */
              value={this.props.meal.extras}
              extras_input_disabled={this.props.ui.extras_input_disabled}
              updateExtras={this.props.actions.meal.updateExtras}

              /* Close Button */
              close_button_hidden={this.props.ui.close_button_hidden}
              close_button_disabled={this.props.ui.close_button_disabled}
              closeMeal={this.props.actions.closeMeal} />
          </section>
        </section>
        <section className={classes.middle}>
          <Attendees
            residents={this.props.residents}
            meal_residents={this.props.meal_residents} />
          <Guests guests={this.props.guests} />
        </section>
      </main>
    )
  }
}

/*
meal.closed
*/
const fourty_eight_hours = 48 * 60 * 60 * 1000

// App
const getCurrentTime = (state) => state.app.current_time

// Meal
const getReconciled = (state) => state.meal.reconciled
const getClosedInDatabase = (state) => state.meal.closed_in_database
const getEpoch = (state) => state.meal.epoch
const getAutoClose = (state) => state.meal.auto_close

// Meal Residents
const getMealResidents = (state) => state.meal_residents

// Guests
const getGuests = (state) => state.guests

// meal.closed
export const getClosed = createSelector(
  [ getReconciled, getClosedInDatabase, getEpoch, getAutoClose, getCurrentTime ],
  (reconciled, closed_in_database, epoch, auto_close, current_time) => {
    return reconciled || closed_in_database || current_time >= epoch ||
           auto_close && current_time + fourty_eight_hours >= epoch
  }
)

// meal.open
export const getOpen = createSelector(
  [ getClosed ],
  (closed) => {
    return !closed
  }
)

// meal.status
export const getMealStatus = createSelector(
  [ getReconciled, getClosed, getOpen ],
  (reconciled, closed, open) => {
    if (reconciled) {
      return 'RECONCILED'
    } else if (closed) {
      return 'CLOSED'
    } else {
      return 'OPEN'
    }
  }
)

// meal.attendees
export const getAttendees = createSelector(
  [ getMealResidents, getGuests ],
  (meal_residents, guests) => {
    return meal_residents.length + guests.length
  }
)

// meal.vegetarians
export const getVegetarians = createSelector(
  [ getMealResidents, getGuests ],
  (meal_residents, guests) => {
    const meal_resident_vegetarians = meal_residents.filter((meal_resident) => meal_resident.vegetarian).length
    const guest_vegetarians = guests.filter((guest) => guest.vegetarian).length
    return meal_resident_vegetarians + guest_vegetarians
  }
)

// meal.omnivores
export const getOmnivores = createSelector(
  [ getAttendees, getVegetarians ],
  (attendees, vegetarians) => {
    return attendees - vegetarians
  }
)

// meal.late
export const getLate = createSelector(
  [ getMealResidents ],
  (meal_residents) => {
    return meal_residents.filter((meal_resident) => meal_resident.late).length
  }
)

// meal.extras
const getMax = (state) => state.meal.max
export const getExtras = createSelector(
  [ getMax, getAttendees ],
  (max, attendees) => {
    return max ? max - attendees : 'n/a'
  }
)

/*
UI
*/
const getIsFetching = (state) => state.app.isFetching
export const get_menu_textarea_disabled = createSelector(
  [ getClosed, getReconciled, getIsFetching ],
  (closed, reconciled, isFetching) => {
    return closed || reconciled || isFetching
  }
)

export const get_cook_select_disabled = createSelector(
  [ getReconciled, getIsFetching ],
  (reconciled, isFetching) => {
    return reconciled || isFetching
  }
)

export const get_cost_input_disabled = createSelector(
  [ getReconciled, getIsFetching ],
  (reconciled, isFetching) => {
    return reconciled || isFetching
  }
)

export const get_extras_input_disabled = createSelector(
  [ getOpen, getReconciled, getIsFetching ],
  (open, reconciled, isFetching) => {
    return open || reconciled || isFetching
  }
)

export const get_close_button_disabled = createSelector(
  [ getIsFetching ],
  (isFetching) => {
    return isFetching
  }
)

export const get_close_button_hidden = createSelector(
  [ getEpoch, getCurrentTime, getClosed, getReconciled ],
  (epoch, current_time, closed, reconciled) => {
    return closed || reconciled || current_time >= epoch ||
           current_time + fourty_eight_hours < epoch
  }
)

export const get_auto_close_checkbox_disabled = createSelector(
  [ getReconciled, getIsFetching ],
  (isFetching) => {
    return isFetching
  }
)

export const get_auto_close_checkbox_hidden = createSelector(
  [ getEpoch, getCurrentTime, getClosed, getReconciled ],
  (epoch, current_time, closed, reconciled) => {
    return closed || reconciled || (epoch - current_time) < fourty_eight_hours
  }
)

export const get_checked_attendance_checkbox_disabled = createSelector(
  [ getClosed, getReconciled, getIsFetching ],
  (closed, reconciled, isFetching) => {
    return closed || reconciled || isFetching
  }
)

export const get_unchecked_attendance_checkbox_disabled = createSelector(
  [ getReconciled, getClosed, getExtras, getIsFetching ],
  (reconciled, closed, extras, isFetching) => {
    return reconciled || (closed && extras === 0) || isFetching
  }
)

export const get_attendee_veg_checkbox_disabled = createSelector(
  [ getReconciled, getIsFetching ],
  (reconciled, isFetching) => {
    return reconciled || isFetching
  }
)

export const get_attendee_late_checkbox_disabled = createSelector(
  [ getReconciled, getIsFetching ],
  (reconciled, isFetching) => {
    return reconciled || isFetching
  }
)

export const get_add_guest_button_disabled = createSelector(
  [ getReconciled, getClosed, getExtras, getIsFetching ],
  (reconciled, closed, extras, isFetching) => {
    return reconciled || (closed && extras === 0) || isFetching
  }
)

export const get_guest_veg_checkbox_disabled = createSelector(
  [ getClosed, getReconciled, getIsFetching ],
  (closed, reconciled, isFetching) => {
    return closed || reconciled || isFetching
  }
)

export const get_remove_guest_button_disabled = createSelector(
  [ getClosed, getReconciled, getIsFetching ],
  (closed, reconciled, isFetching) => {
    return closed || reconciled || isFetching
  }
)

const mapStateToProps = (state) => {
  return {
    app: state.app,
    meal: state.meal,
    residents: state.residents,
    meal_residents: state.meal_residents,
    bill1: state.bill1,
    bill2: state.bill2,
    bill3: state.bill3,
    guests: state.guests
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps,
    {
      meal: {
        id: stateProps.meal.id,
        description: stateProps.meal.description,
        date: stateProps.meal.date,
        attendees: getAttendees(stateProps),
        omnivores: getOmnivores(stateProps),
        vegetarians: getVegetarians(stateProps),
        late: getLate(stateProps),
        extras: getExtras(stateProps),
        auto_close: stateProps.meal.auto_close,
        status: getMealStatus(stateProps),
        hasNext: stateProps.meal.hasNext,
        hasPrev: stateProps.meal.hasPrev
      },
      bills: {
        '1': stateProps.bill1,
        '2': stateProps.bill2,
        '3': stateProps.bill3
      },
      residents: stateProps.residents,
      meal_residents: stateProps.meal_residents,
      guests: stateProps.guests,
      actions: {
        meal: {
          updateDescription: dispatchProps.updateDescription,
          updateExtras: dispatchProps.updateExtras,
          updateAutoClose: dispatchProps.updateAutoClose,
          closeMeal: dispatchProps.closeMeal
        },
        bills: {
          '1': {
            updateCook: dispatchProps.updateCook1,
            updateCost: dispatchProps.updateCost1
          },
          '2': {
            updateCook: dispatchProps.updateCook2,
            updateCost: dispatchProps.updateCost2
          },
          '3': {
            updateCook: dispatchProps.updateCook3,
            updateCost: dispatchProps.updateCost3
          }
        }
      },
      ui: {
        // Menu
        menu_textarea_disabled: get_menu_textarea_disabled(stateProps),

        // Cooks
        cook_select_disabled: get_cook_select_disabled(stateProps),
        cost_input_disabled: get_cost_input_disabled(stateProps),

        /*
        Extras
        */
        // Auto-Close Checkbox
        auto_close_checkbox_hidden: get_auto_close_checkbox_hidden(stateProps),
        auto_close_checkbox_disabled: get_auto_close_checkbox_disabled(stateProps),

        // Extras Input Field
        extras_input_disabled: get_extras_input_disabled(stateProps),

        // Close Button
        close_button_hidden: get_close_button_hidden(stateProps),
        close_button_disabled: get_close_button_disabled(stateProps),

        // Attendees
        checked_attendance_checkbox_disabled: get_checked_attendance_checkbox_disabled(stateProps),
        unchecked_attendance_checkbox_disabled: get_unchecked_attendance_checkbox_disabled(stateProps),
        attendee_veg_checkbox_disabled: get_attendee_veg_checkbox_disabled(stateProps),
        attendee_late_checkbox_disabled: get_attendee_late_checkbox_disabled(stateProps),
        add_guest_button_disabled: get_add_guest_button_disabled(stateProps),

        // Guests
        guest_veg_checkbox_disabled: get_guest_veg_checkbox_disabled(stateProps),
        remove_guest_button_disabled: get_remove_guest_button_disabled(stateProps)
      }
    }
  )
}

export default connect(
  mapStateToProps,
  {
    updateDescription,
    updateExtras,
    updateAutoClose,
    closeMeal,
    updateCook1,
    updateCost1,
    updateCook2,
    updateCost2,
    updateCook3,
    updateCost3
  },
  mergeProps
)(HomeView)

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
import { addMealResident,
         removeMealResident,
         toggleMealResidentVeg,
         toggleLate } from '../../redux/modules/MealResidents'
import { openGuestModal,
         toggleModalVeg,
         toggleModalMultiplier,
         closeGuestModal } from '../../redux/modules/GuestModal'
import { addGuest, removeGuest, toggleGuestVeg } from '../../redux/modules/Guests'

// Components
import DateBox from '../../components/DateBox/DateBox'
import Menu from '../../components/Menu/Menu'
import Cooks from '../../components/Cooks/Cooks'
import Signups from '../../components/Signups/Signups'
import Extra from '../../components/Extra/Extra'
import Attendees from '../../components/Attendees/Attendees'
import Guests from '../../components/Guests/Guests'
import GuestModal from '../../components/GuestModal/GuestModal'

// Schemas
import type { MealSchema } from '../../redux/modules/Meal'
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { MealResidentsSchema } from '../../redux/modules/MealResidents'
import type { BillsSchema } from '../../redux/modules/bill'
import type { GuestsSchema } from '../../redux/modules/Guests'
import type { ActionsSchema } from '../../redux/modules/actions'
import type { UISchema } from '../../redux/modules/UI'
import type { GuestModalSchema } from '../../redux/modules/GuestModal'

type Props = {
  data: {
    meal: MealSchema,
    bills: BillsSchema,
    residents: ResidentsSchema,
    meal_residents: MealResidentsSchema,
    guests: GuestsSchema,
    guest_modal: GuestModalSchema
  },
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
              meal_id={this.props.data.meal.id}
              date={this.props.data.meal.date}
              hasPrev={this.props.data.meal.hasPrev}
              hasNext={this.props.data.meal.hasNext}
              status={this.props.data.meal.status} />
            <Menu
              disabled={this.props.ui.menu.textarea_disabled}
              description={this.props.data.meal.description}
              updateDescription={this.props.actions.meal.updateDescription} />
          </section>
          <section className={classes['cooks-and-signups']}>
            <Cooks
              select_disabled={this.props.ui.cooks.select_disabled}
              input_disabled={this.props.ui.cooks.input_disabled}
              residents={this.props.data.residents}
              bills={this.props.data.bills}
              actions={this.props.actions.bills} />
            <Signups
              attendees={this.props.data.meal.attendees}
              omnivores={this.props.data.meal.omnivores}
              vegetarians={this.props.data.meal.vegetarians}
              late={this.props.data.meal.late} />
            <Extra
              /* Auto-Close Checkbox */
              auto_close={this.props.data.meal.auto_close}
              auto_close_checkbox_hidden={this.props.ui.auto_close_checkbox.hidden}
              auto_close_checkbox_disabled={this.props.ui.auto_close_checkbox.disabled}
              updateAutoClose={this.props.actions.meal.updateAutoClose}

              /* Extras Input Field */
              // UI
              input_value={this.props.ui.extras.input_value}
              input_disabled={this.props.ui.extras.input_disabled}
              // Actions
              updateExtras={this.props.actions.meal.updateExtras}
              // Data
              attendees={this.props.data.meal.attendees}

              /* Close Button */
              close_button_hidden={this.props.ui.close_button.hidden}
              close_button_disabled={this.props.ui.close_button.disabled}
              closeMeal={this.props.actions.meal.closeMeal} />
          </section>
        </section>
        <section className={classes.middle}>
          <Attendees
            ui={this.props.ui.attendees}
            actions={this.props.actions.meal_residents}
            residents={this.props.data.residents}
            meal_residents={this.props.data.meal_residents} />
          <GuestModal
            data={this.props.data.guest_modal}
            actions={this.props.actions.guest_modal} />
          <Guests
            ui={this.props.ui.guests}
            actions={this.props.actions.guests}
            guests={this.props.data.guests}
            residents={this.props.data.residents} />
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
// meal.reconciled
export const getReconciled = (state) => state.meal.reconciled
const getClosedInDatabase = (state) => state.meal.closed_in_database
const getEpoch = (state) => state.meal.epoch
const getShouldAutoClose = (state) => state.meal.auto_close
const getMax = (state) => state.meal.max

// Meal Residents
const getMealResidents = (state) => state.meal_residents

// Guests
const getGuests = (state) => state.guests

const getHasBeenAutoClosed = createSelector(
  [ getShouldAutoClose, getCurrentTime, getEpoch ],
  (should_auto_close, current_time, epoch) => {
    return should_auto_close && current_time + fourty_eight_hours >= epoch
  }
)

// meal.passed
export const getPassed = createSelector(
  [ getCurrentTime, getEpoch ],
  (current_time, epoch) => {
    return current_time >= epoch
  }
)

// meal.closed
export const getClosed = createSelector(
  [ getClosedInDatabase, getHasBeenAutoClosed ],
  (closed_in_database, has_been_auto_closed) => {
    return closed_in_database || has_been_auto_closed
  }
)

// meal.open
export const getOpen = createSelector(
  [ getReconciled, getPassed, getClosed ],
  (reconciled, passed, closed) => {
    return !reconciled && !passed && !closed
  }
)

// meal.status
export const getMealStatus = createSelector(
  [ getReconciled, getPassed, getClosed ],
  (reconciled, passed, closed) => {
    if (reconciled) {
      return 'RECONCILED' // no changes at all
    } else if (closed) {
      return 'CLOSED' // *see below
    } else if (passed) {
      return 'PASSED' // only bill changes
    } else {
      return 'OPEN' // all changes permitted
    }
  }
)

/*
CLOSED:
- can't change menu
- can change bills
- can change extras
- can add attendance if extras
- can't change veg
- can't change late
- can add guests if extras
- can't remove guests
*/

// meal.attendees (count)
export const getAttendeesCount = createSelector(
  [ getMealResidents, getGuests ],
  (meal_residents, guests) => {
    return meal_residents.length + guests.length
  }
)

// meal.vegetarians (count)
export const getVegetarians = createSelector(
  [ getMealResidents, getGuests ],
  (meal_residents, guests) => {
    return meal_residents.filter((meal_resident) => meal_resident.vegetarian).length +
           guests.filter((guest) => guest.vegetarian).length
  }
)

// meal.omnivores (count)
export const getOmnivores = createSelector(
  [ getAttendeesCount, getVegetarians ],
  (attendees, vegetarians) => {
    return attendees - vegetarians
  }
)

// meal.late (count)
export const getLate = createSelector(
  [ getMealResidents ],
  (meal_residents) => {
    return meal_residents.filter((meal_resident) => meal_resident.late).length
  }
)

// meal.extras (count)
export const getExtras = createSelector(
  [ getMax, getAttendeesCount ],
  (max, attendees) => {
    return max ? (max - attendees) : 0
  }
)

/*
UI
*/
// app.is_fetching
export const getIsFetching = (state) => state.app.isFetching

// Menu
// ui.menu.textarea_disabled
export const get_menu_textarea_disabled = createSelector(
  [ getOpen, getIsFetching ],
  (open, isFetching) => {
    return !open || isFetching
  }
)

// Bills
// (TODO: create selector --> ui.bills.disabled)
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

// Extras Input
// ui.extras.input_disabled
export const get_extras_input_disabled = createSelector(
  [ getMealStatus, getIsFetching ],
  (mealStatus, isFetching) => {
    return mealStatus !== 'CLOSED' || isFetching
  }
)

// ui.extras.input_value
export const get_extras_input_value = createSelector(
  [ getExtras, get_extras_input_disabled ],
  (extras, disabled) => {
    if (disabled) return 'n/a'
    if (extras === 0) return ''
    return extras.toString()
  }
)

// Close Button
export const get_close_button_disabled = createSelector(
  [ getIsFetching ],
  (isFetching) => {
    return isFetching
  }
)

export const get_close_button_hidden = createSelector(
  [ getOpen, getIsFetching, getCurrentTime, getEpoch ],
  (open, isFetching, current_time, epoch) => {
    return !open || isFetching || (epoch - current_time > fourty_eight_hours)
  }
)

// Auto-Close Checkbox
export const get_auto_close_checkbox_disabled = createSelector(
  [ getIsFetching ],
  (isFetching) => {
    return isFetching
  }
)

export const get_auto_close_checkbox_hidden = createSelector(
  [ getOpen, getEpoch, getCurrentTime ],
  (open, epoch, current_time) => {
    return !open || (epoch - current_time) < fourty_eight_hours
  }
)

// Attendees
export const get_checked_attendance_checkbox_disabled = createSelector(
  [ getOpen, getIsFetching ],
  (open, isFetching) => {
    return !open || isFetching
  }
)

export const get_unchecked_attendance_checkbox_disabled = createSelector(
  [ getIsFetching, getReconciled, getPassed, getClosed, getExtras ],
  (isFetching, reconciled, passed, closed, extras) => {
    return isFetching || reconciled || passed || (closed && extras === 0)
  }
)

export const get_attendee_veg_checkbox_disabled = createSelector(
  [ getOpen, getIsFetching ],
  (open, isFetching) => {
    return !open || isFetching
  }
)

export const get_attendee_late_checkbox_disabled = createSelector(
  [ getPassed, getIsFetching ],
  (passed, isFetching) => {
    return passed || isFetching
  }
)

// Guests
export const get_add_guest_button_disabled = createSelector(
  [ getIsFetching, getReconciled, getPassed, getClosed, getExtras ],
  (isFetching, reconciled, passed, closed, extras) => {
    return isFetching || reconciled || passed || (closed && extras === 0)
  }
)

export const get_guest_veg_checkbox_disabled = createSelector(
  [ getOpen, getIsFetching ],
  (open, isFetching) => {
    return !open || isFetching
  }
)

export const get_remove_guest_button_disabled = createSelector(
  [ getOpen, getIsFetching ],
  (open, isFetching) => {
    return !open || isFetching
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
    guests: state.guests,
    guest_modal: state.guest_modal
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps,
    {
      data: {
        meal: {
          id: stateProps.meal.id,
          description: stateProps.meal.description,
          date: stateProps.meal.date,
          attendees: getAttendeesCount(stateProps),
          omnivores: getOmnivores(stateProps),
          vegetarians: getVegetarians(stateProps),
          late: getLate(stateProps),
          max: getMax(stateProps),
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
        guest_modal: stateProps.guest_modal
      },
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
        },
        meal_residents: {
          addMealResident: dispatchProps.addMealResident,
          removeMealResident: dispatchProps.removeMealResident,
          toggleVeg: dispatchProps.toggleMealResidentVeg,
          toggleLate: dispatchProps.toggleLate,
          openGuestModal: dispatchProps.openGuestModal
        },
        guests: {
          remove: dispatchProps.removeGuest,
          toggleVeg: dispatchProps.toggleGuestVeg,
          toggleMultiplier: dispatchProps.toggleGuestMultiplier
        },
        guest_modal: {
          close: dispatchProps.closeGuestModal,
          toggleVeg: dispatchProps.toggleModalVeg,
          toggleMultiplier: dispatchProps.toggleModalMultiplier,
          addGuest: dispatchProps.addGuest
        }
      },
      ui: {
        menu: {
          textarea_disabled: get_menu_textarea_disabled(stateProps)
        },
        cooks: {
          select_disabled: get_cook_select_disabled(stateProps),
          input_disabled: get_cost_input_disabled(stateProps)
        },
        auto_close_checkbox: {
          hidden: get_auto_close_checkbox_hidden(stateProps),
          disabled: get_auto_close_checkbox_disabled(stateProps)
        },
        extras: {
          input_value: get_extras_input_value(stateProps),
          input_disabled: get_extras_input_disabled(stateProps)
        },
        close_button: {
          hidden: get_close_button_hidden(stateProps),
          disabled: get_close_button_disabled(stateProps)
        },
        attendees: {
          checked_checkbox_disabled: get_checked_attendance_checkbox_disabled(stateProps),
          unchecked_checkbox_disabled: get_unchecked_attendance_checkbox_disabled(stateProps),
          veg_checkbox_disabled: get_attendee_veg_checkbox_disabled(stateProps),
          late_checkbox_disabled: get_attendee_late_checkbox_disabled(stateProps),
          add_guest_button_disabled: get_add_guest_button_disabled(stateProps)
        },
        guests: {
          veg_checkbox_disabled: get_guest_veg_checkbox_disabled(stateProps),
          remove_button_disabled: get_remove_guest_button_disabled(stateProps)
        }
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
    updateCost3,
    addMealResident,
    removeMealResident,
    toggleMealResidentVeg,
    toggleLate,
    openGuestModal,
    toggleModalVeg,
    toggleModalMultiplier,
    closeGuestModal,
    addGuest,
    removeGuest,
    toggleGuestVeg
  },
  mergeProps
)(HomeView)

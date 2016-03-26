/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import classes from './HomeView.scss'

// Actions
import { updateDescription, updateExtras, closeMeal } from '../../redux/modules/Meal'
import { updateBill, updateCost } from '../../redux/modules/Bills'

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
import type { BillsSchema } from '../../redux/modules/Bills'
import type { GuestsSchema } from '../../redux/modules/Guests'
import type { ReducedUISchema } from '../../redux/modules/UI'

type Props = {
  meal: MealSchema,
  residents: ResidentsSchema,
  meal_residents: MealResidentsSchema,
  bills: BillsSchema,
  guests: GuestsSchema,
  ui: ReducedUISchema,
  updateDescription: Function,
  updateExtras: Function,
  closeMeal: Function,
  updateBill: Function,
  updateCost: Function
};

export class HomeView extends React.Component<void, Props, void> {
  render () {
    return (
      <main className={classes.main}>
        <section className={classes.top}>
          <section className={classes['date-and-menu']}>
            <DateBox meal_id={this.props.meal.id} date={this.props.meal.date} status={this.props.meal.status} />
            <Menu
              disabled={this.props.ui.menu_textarea.disabled}
              description={this.props.meal.description}
              handleDescriptionUpdate={this.props.updateDescription} />
          </section>
          <section className={classes['cooks-and-signups']}>
            <Cooks residents={this.props.residents} bills={this.props.bills}
              updateBill={this.props.updateBill} updateCost={this.props.updateCost} />
            <Signups omnivore={this.props.meal.omnivore}
              vegetarian={this.props.meal.vegetarian}
              late={this.props.meal.late} />
            <Extra extras={this.props.meal.extras} auto_close={this.props.meal.auto_close}
              updateExtras={this.props.updateExtras}
              closeMeal={this.props.closeMeal} />
          </section>
        </section>
        <section className={classes.middle}>
          <Attendees residents={this.props.residents} meal_residents={this.props.meal_residents} />
          <Guests guests={this.props.guests} />
        </section>
      </main>
    )
  }
}

function getUIState (state) {
  return {
    menu_textarea: {
      disabled: (state.meal.status.closed || state.meal.status.reconciled)
    },
    cook_select: {
      disabled: state.meal.status.reconciled
    },
    cost_input: {
      disabled: state.meal.status.reconciled
    },
    extras_input: {
      disabled: state.meal.status.open || state.meal.status.reconciled,
      value: state.meal.status.open ? 'n/a' : state.meal.extras
    },
    close_button: {
      hidden: (state.meal.status.closed || state.meal.status.reconciled) ||
        (state.meal.seconds_before_start / (60 * 60)) >= 48
    },
    auto_close_checkbox: {
      hidden: (state.meal.status.closed || state.meal.status.reconciled) ||
        (state.meal.seconds_before_start / (60 * 60)) <= 48
    },
    attendance_checkbox: {
      checked: {
        disabled: (state.meal.status.closed || state.meal.status.reconciled)
      },
      unchecked: {
        disabled: state.meal.status.reconciled || (state.meal.status.closed && state.meal.extras === 0)
      }
    },
    attendee_veg_checkbox: {
      disabled: (state.meal.status.closed || state.meal.status.reconciled)
    },
    attendee_late_checkbox: {
      disabled: state.meal.status.reconciled
    },
    add_guest_button: {
      disabled: state.meal.status.reconciled || (state.meal.status.closed && state.meal.extras === 0)
    },
    guest_veg_checkbox: {
      disabled: (state.meal.status.closed || state.meal.status.reconciled)
    },
    remove_guest_button: {
      disabled: (state.meal.status.closed || state.meal.status.reconciled)
    }
  }
}

// const mapStateToProps = (state) => ({counter: state.counter})

function mapStateToProps (state) {
  return {
    meal: state.meal,
    residents: state.residents,
    meal_residents: state.meal_residents,
    bills: state.bills,
    guests: state.guests,
    ui: getUIState(state)
  }
}

export default connect((mapStateToProps), {
  updateDescription,
  updateExtras,
  closeMeal,
  updateBill,
  updateCost
})(HomeView)

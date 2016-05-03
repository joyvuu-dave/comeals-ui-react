/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import classes from './MealView.scss'
import { createSelector } from 'reselect'
import _ from 'lodash'
import { normalize, Schema, arrayOf } from 'normalizr'

// Normalizr
const meal = new Schema('meals')    // many: residents, bills, meal_residents, and guests
const resident = new Schema('residents')
const bill = new Schema('bills')                    // 1 meal (implied), 1 resident
const meal_resident = new Schema('meal_residents')  // 1 meal (implied), 1 resident
const guest = new Schema('guests')                  // 1 meal (implied), 1 resident

meal.define({
  residents: arrayOf(resident),
  bills: arrayOf(bill),
  meal_residents: arrayOf(meal_resident),
  guests: arrayOf(guest)
})

bill.define({
  resident: resident
})

meal_resident.define({
  resident: resident
})

guest.define({
  resident: resident
})

// Actions
import { setCurrentTime, fetchMealAsync, persistMealAsync, cancelChanges } from '../../redux/modules/App'
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
import type { BillsSchema } from '../../redux/modules/bills'
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
  componentDidMount () {
    this.props.actions.app.fetchMealAsync(this.props.params.id)
    //setInterval(this.props.actions.app.setCurrentTime, 60000)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.actions.app.fetchMealAsync(nextProps.params.id)
    }
  }

  render () {
    return (
      <main className={classes.main}>
        <section className={classes.top}>
          <section className={classes['date-and-menu']}>
            <DateBox
              meal_id={this.props.data.meal.id}
              date={this.props.data.meal.date}
              prevId={this.props.data.meal.prevId}
              nextId={this.props.data.meal.nextId}
              status={this.props.data.meal.status}
              ui={this.props.ui.save_button}
              persistMealAsync={this.props.actions.app.persistMealAsync}
              cancelChanges={this.props.actions.app.cancelChanges}
              data_has_changed={this.props.meta.data_has_changed}
              current_data={this.props.meta.current_data} />
            <Menu
              disabled={this.props.ui.menu.textarea_disabled}
              description={this.props.data.meal.description}
              updateDescription={this.props.actions.meal.updateDescription} />
          </section>
          <section className={classes['cooks-and-signups']}>
            <Cooks
              ui={this.props.ui.cooks}
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
const getCurrentTime = (state) => state.app.currentTime
const getHasLoaded = (state) => state.app.hasLoaded

// Meal
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
  (should_auto_close, currentTime, epoch) => {
    return should_auto_close && currentTime + fourty_eight_hours >= epoch
  }
)

// meal.passed
export const getPassed = createSelector(
  [ getCurrentTime, getEpoch ],
  (currentTime, epoch) => {
    return currentTime >= epoch
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
  [ getHasLoaded, getReconciled, getPassed, getClosed ],
  (hasLoaded, reconciled, passed, closed) => {
    if (!hasLoaded) {
      return 'LOADING...'
    }

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
    let meal_resident_veg_count = 0
    if (meal_residents.length > 0) {
      meal_resident_veg_count = meal_residents.filter((meal_resident) => meal_resident.vegetarian).length
    }

    let guest_veg_count = 0
    if (guests.length > 0) {
      guest_veg_count = guests.filter((guest) => guest.vegetarian).length
    }

    return meal_resident_veg_count + guest_veg_count
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
    let meal_resident_late_count = 0
    if (meal_residents.length > 0) {
      meal_resident_late_count = meal_residents.filter((meal_resident) => meal_resident.late).length
    }

    return meal_resident_late_count
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
  [ getOpen, getCurrentTime, getEpoch ],
  (open, currentTime, epoch) => {
    return !open || (epoch - currentTime > fourty_eight_hours)
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
  (open, epoch, currentTime) => {
    return !open || (epoch - currentTime) < fourty_eight_hours
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
  [ getPassed, getReconciled, getIsFetching ],
  (passed, reconciled, isFetching) => {
    return passed || reconciled || isFetching
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

// Save Button
export const get_save_button_disabled = createSelector(
  [ getIsFetching ],
  (isFetching) => {
    return isFetching
  }
)

export const getIsSaving = (state) => state.app.isSaving
export const get_save_button_value = createSelector(
  [ getIsSaving ],
  (isSaving) => {
    return isSaving ? 'Saving...' : 'Save'
  }
)

/*
TEMP: APP IS DIRTY
*/

// description
export const getPersistedDescription = (state) => state.persisted_data.description
export const getCurrentDescription = (state) => state.meal.description

export const get_description_has_changed = createSelector(
  [ getPersistedDescription, getCurrentDescription ],
  (persistedDescription, currentDescription) => {
    return persistedDescription !== currentDescription
  }
)

// max
export const getPersistedMax = (state) => state.persisted_data.max
export const get_max_has_changed = createSelector(
  [ getPersistedMax, getMax ],
  (persistedMax, max) => {
    return persistedMax !== max
  }
)

// auto-close
export const getPersistedAutoClose = (state) => state.persisted_data.auto_close
export const get_auto_close_has_changed = createSelector(
  [ getPersistedAutoClose, getShouldAutoClose ],
  (persistedAutoClose, should_auto_close) => {
    return persistedAutoClose !== should_auto_close
  }
)

// closed
export const getPersistedClosed = (state) => state.persisted_data.closed_in_database
export const get_closed_has_changed = createSelector(
  [ getPersistedClosed, getClosedInDatabase ],
  (persistedClose, closed_in_database) => {
    return persistedClose !== closed_in_database
  }
)

// bills
export const getBill1 = (state) => state.bill1
export const getBill2 = (state) => state.bill2
export const getBill3 = (state) => state.bill3
export const get_current_bills = createSelector(
  [ getBill1, getBill2, getBill3 ],
  (bill1, bill2, bill3) => {
    return [bill1, bill2, bill3]
  }
)

export const getPersistedBills = (state) => state.persisted_data.bills

// meal-residents
export const getPersistedMealResidents = (state) => state.persisted_data.meal_residents
export const getCurrentMealResidents = (state) => state.meal_residents

// guests
export const getPersistedGuests = (state) => state.persisted_data.guests
export const getCurrentGuests = (state) => state.guests

// currentData
export const getCurrentData = createSelector(
  [ getCurrentDescription, getMax, getShouldAutoClose,
    getClosed, get_current_bills, getCurrentMealResidents,
    getCurrentGuests ],
  (description, max, autoClose,
   closed, bills, meal_residents,
   guests) => {
    return {
      auto_close: autoClose,
      bills: bills,
      closed_in_database: closed,
      description: description,
      guests: guests,
      max: max,
      meal_residents: meal_residents
    }
  }
)

/*
CREATE PATCH OBJ
*/
export const getResidents = (state) => state.residents
export const getAttendeePatchObj = createSelector(
  [ getResidents, getPersistedMealResidents, getCurrentMealResidents ],
  (residents, persistedMealResidents, currentMealResidents) => {
    let residents_temp = residents || []
    let persistedMealResidents_temp = persistedMealResidents || []
    let currentMealResidents_temp = currentMealResidents || []

    const residentIds = residents_temp.map((r) => r.id)
    const persistedResidentIds = persistedMealResidents_temp.map((p) => p.resident_id)
    const currentResidentIds = currentMealResidents_temp.map((c) => c.resident_id)

    let arr = []
    residents_temp.forEach((resident) => {
      let currentIndex = currentResidentIds.indexOf(resident.id)
      let persistedIndex = persistedResidentIds.indexOf(resident.id)

      let existsInCurrent = currentIndex !== -1
      let existsInPersisted = persistedIndex !== -1

      // case 1: exists in current but not persisted - create
      if (existsInCurrent && !existsInPersisted) {
        arr.push({resident_id: resident.id, vegetarian: resident.vegetarian})
        return
      }

      // case 2: exists in persisted but not current - delete
      if (existsInPersisted && !existsInCurrent) {
        arr.push({id: persistedMealResidents_temp[persistedIndex].id, _delete: true})
        return
      }

      // case 3: exists in persisted and current but is different - update
      let current = currentMealResidents_temp[currentIndex]
      let persisted = persistedMealResidents_temp[persistedIndex]

      if (existsInPersisted && existsInCurrent) {
        let vegChanged = !_.isEqual(current.vegetarian, persisted.vegetarian)
        let lateChanged = !_.isEqual(current.late, persisted.late)

        if (vegChanged || lateChanged) {
          let obj = {id: persisted.id}

          if (vegChanged) {
            obj.vegetarian = current.vegetarian
          }

          if (lateChanged) {
            obj.late = current.late
          }

          arr.push(obj)
        }
        return
      }

      // case 4: exists in persisted and current and is the same
      return
    })
    return arr
  }
)

const getBillsPatchObj = createSelector(
  [ getPersistedBills, get_current_bills ],
  (persistedBills, currentBills) => {
    let patchObj = []

    _.forEach(currentBills, (bill, index) => {
      if (bill.id !== "") {
        if (bill.resident_id === -1) {
          // DELETE bill
          patchObj.push({id: bill.id, _delete: true})
        } else {
          const differentResident = bill.resident_id !== persistedBills[index].resident_id
          const differentAmount = bill.amount !== persistedBills[index].amount

          if (differentResident || differentAmount) {
            // UPDATE bill
            let obj = {id: bill.id}
            if (differentResident) {
              obj.resident_id = bill.resident_id
            }
            if (differentAmount) {
              obj.amount = bill.amount
            }
            patchObj.push(obj)
          }
        }
      } else {
        if (bill.resident_id !== -1) {
          // CREATE bill
          patchObj.push({resident_id: bill.resident_id, amount: bill.amount})
        }
      }
    })
    return patchObj
  }
)

const getGuestsPatchObj = createSelector(
  [ getPersistedGuests, getCurrentGuests ],
  (persistedGuests, currentGuests) => {
    const persistedGuestsArray = persistedGuests || []
    const currentGuestsArray = currentGuests || []

    // If a current guest record has an ID, then it is also persisted
    // This array contains only current guests
    const persistedAndCurrent = currentGuests.filter((guest) => guest.id !== undefined)

    // A record is only persisted if there is no matching record in the current array
    const ids = persistedAndCurrent.map((guest) => guest.id)
    const justPersisted = persistedGuestsArray.filter((guest) => ids.indexOf(guest.id) === -1)

    // A record is only current if it does not have an id
    const justCurrent = currentGuestsArray.filter((guest) => guest.id === undefined)

    let patchObj = []

    // DELETE
    _.each(justPersisted, (guest) => {
      patchObj.push({id: guest.id, _delete: true})
    })

    // CREATE
    _.each(justCurrent, (guest) => {
      let data = Object.assign({}, guest)
      delete data.cid
      patchObj.push(data)
    })

    // UPDATE
    _.each(persistedAndCurrent, (current) => {
      let persisted = persistedGuestsArray.find((guest) => guest.id === current.id)

      const hasChanged = persisted.vegetarian !== current.vegetarian
      if (hasChanged) {
        patchObj.push({id: current.id, vegetarian: current.vegetarian})
      }
    })

    return patchObj
  }
)

const getPatchObj = createSelector(
  [ get_auto_close_has_changed, getShouldAutoClose, getBillsPatchObj,
    get_closed_has_changed, getClosedInDatabase, get_description_has_changed, getCurrentDescription,
    getGuestsPatchObj, get_max_has_changed, getMax, getAttendeePatchObj ],
  ( autoCloseHasChanged, current_auto_close, billsPatchObj,
    closedHasChanged, closedInDatabase, descriptionHasChanged, currentDescription,
    guestsPatchObj, maxHasChanged, max, attendeePatchObj) => {

    let patchObj = {}

    // auto_close
    if (autoCloseHasChanged) {
      patchObj.auto_close = current_auto_close
    }

    // bills
    if (billsPatchObj.length > 0) {
      patchObj.bills = billsPatchObj
    }

    // closed_in_database
    if (closedHasChanged) {
      patchObj.closed_in_database = closedInDatabase
    }

    // description
    if (descriptionHasChanged) {
      patchObj.description = currentDescription
    }

    // guests
    if (guestsPatchObj.length > 0) {
      patchObj.guests = guestsPatchObj
    }

    // max
    if (maxHasChanged) {
      patchObj.max = max
    }

    // meal_residents (attendees)
    if (attendeePatchObj.length > 0) {
      patchObj.meal_residents = attendeePatchObj
    }

    return patchObj
  }
)

const getDataHasChanged = createSelector(
  [ getPatchObj ],
  (patchObj) => {
    return _.keys(patchObj).length > 0
  }
)

const getSaveButtonHidden = createSelector(
  [ getDataHasChanged, getHasLoaded ],
  (dataHasChanged, hasLoaded) => {
    return !dataHasChanged || !hasLoaded
  }
)

const getCook1ErrorMessage = createSelector(
  [ getBill1 ],
  (bill) => {
    if (bill.amount === '') return ''

    const re = /^(\d*\.?\d{0,2})$/
    if (bill.resident_id !== -1 && !re.exec(bill.amount)) {
      return 'invalid amount'
    }
  }
)

const getCook2ErrorMessage = createSelector(
  [ getBill2 ],
  (bill) => {
    if (bill.amount === '') return ''

    const re = /^(\d*\.?\d{0,2})$/
    if (bill.resident_id !== -1 && !re.exec(bill.amount)) {
      return 'invalid amount'
    }
  }
)

const getCook3ErrorMessage = createSelector(
  [ getBill3 ],
  (bill) => {
    if (bill.amount === '') return ''

    const re = /^(\d*\.?\d{0,2})$/
    if (bill.resident_id !== -1 && !re.exec(bill.amount)) {
      return 'invalid amount'
    }
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
    guest_modal: state.guest_modal,
    persisted_data: state.persisted_data
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps,
    {
      meta: {
        data_has_changed: getDataHasChanged(stateProps),
        current_data: getCurrentData(stateProps),
        patch_obj: getPatchObj(stateProps)
      },
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
          prevId: stateProps.meal.prevId,
          nextId: stateProps.meal.nextId
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
        app: {
          fetchMealAsync: dispatchProps.fetchMealAsync,
          setCurrentTime: dispatchProps.setCurrentTime,
          persistMealAsync: dispatchProps.persistMealAsync,
          cancelChanges: dispatchProps.cancelChanges
        },
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
          input_disabled: get_cost_input_disabled(stateProps),
          error_message: {
            '1': getCook1ErrorMessage(stateProps),
            '2': getCook2ErrorMessage(stateProps),
            '3': getCook3ErrorMessage(stateProps)
          }
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
        },
        save_button: {
          hidden: getSaveButtonHidden(stateProps),
          disabled: get_save_button_disabled(stateProps),
          value: get_save_button_value(stateProps)
        }
      }
    }
  )
}

export default connect(
  mapStateToProps,
  {
    fetchMealAsync,
    setCurrentTime,
    persistMealAsync,
    cancelChanges,
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

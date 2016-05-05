/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import classes from './MealView.scss'
import { createSelector } from 'reselect'
import _ from 'lodash'

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
import type {
  ActionsSchema,
  BillsSchema,
  GuestModalSchema,
  GuestsSchema,
  MealResidentsSchema,
  MealSchema,
  ResidentsSchema,
  UISchema
} from '../../redux/modules/schema/schema'

type Props = {
  meta: {
    patchObj: Object
  },
  data: {
    meal: MealSchema,
    bills: BillsSchema,
    residents: ResidentsSchema,
    mealResidents: MealResidentsSchema,
    guests: GuestsSchema,
    guestModal: GuestModalSchema
  },
  actions: ActionsSchema,
  ui: UISchema
};

export class HomeView extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handlePatch = this.handlePatch.bind(this)
  }

  componentDidMount () {
    this.props.actions.app.fetchMealAsync(this.props.params.id)
    // setInterval(this.props.actions.app.setCurrentTime, 60000)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.actions.app.fetchMealAsync(nextProps.params.id)
    }
  }

  handlePatch () {
    this.props.actions.app.persistMealAsync(this.props.data.meal.id, this.props.meta.patchObj)
  }

  render () {
    return (
      <main className={classes.main}>
        <section className={classes.top}>
          <section className={classes['date-and-menu']}>
            <DateBox
              date={this.props.data.meal.date}
              prevId={this.props.data.meal.prevId}
              nextId={this.props.data.meal.nextId}
              status={this.props.data.meal.status}
              save_button_ui={this.props.ui.save_button}
              cancel_button_ui={this.props.ui.cancel_button}
              links_ui={this.props.ui.links}
              persistMealAsync={this.handlePatch}
              cancelChanges={this.props.actions.app.cancelChanges} />
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
            actions={this.props.actions.mealResidents}
            residents={this.props.data.residents}
            mealResidents={this.props.data.mealResidents} />
          <GuestModal
            data={this.props.data.guestModal}
            actions={this.props.actions.guestModal} />
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
const fourtyEightHours = 48 * 60 * 60 * 1000

// App
const getCurrentTime = (state) => state.app.currentTime
const getIsLoading = (state) => state.app.isLoading
const getIsSaving = (state) => state.app.isSaving

// Meal
export const getReconciled = (state) => state.meal.reconciled
const getClosedInDatabase = (state) => state.meal.closed_in_database
const getEpoch = (state) => state.meal.epoch
const getShouldAutoClose = (state) => state.meal.auto_close
const getMax = (state) => state.meal.max

// Meal Residents
const getMealResidents = (state) => state.mealResidents

// Guests
const getGuests = (state) => state.guests

const getHasBeenAutoClosed = createSelector(
  [ getShouldAutoClose, getCurrentTime, getEpoch ],
  (shouldAutoClose, currentTime, epoch) => {
    return shouldAutoClose && currentTime + fourtyEightHours >= epoch
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
  (closedInDataBase, hasBeenAutoClosed) => {
    return closedInDataBase || hasBeenAutoClosed
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
  [ getIsLoading, getReconciled, getPassed, getClosed ],
  (isLoading, reconciled, passed, closed) => {
    if (isLoading) {
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
  (mealResidents, guests) => {
    return mealResidents.length + guests.length
  }
)

// meal.vegetarians (count)
export const getVegetarians = createSelector(
  [ getMealResidents, getGuests ],
  (mealResidents, guests) => {
    let mealResidentVegCount = 0
    if (mealResidents.length > 0) {
      mealResidentVegCount = mealResidents.filter((mealResident) => mealResident.vegetarian).length
    }

    let guestVegCount = 0
    if (guests.length > 0) {
      guestVegCount = guests.filter((guest) => guest.vegetarian).length
    }

    return mealResidentVegCount + guestVegCount
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
  (mealResidents) => {
    let mealResidentLateCount = 0
    if (mealResidents.length > 0) {
      mealResidentLateCount = mealResidents.filter((mealResident) => mealResident.late).length
    }

    return mealResidentLateCount
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
// Menu
// ui.menu.textarea_disabled
export const getMenuTextareaDisabled = createSelector(
  [ getOpen, getIsLoading, getIsSaving ],
  (open, isLoading, isSaving) => {
    return !open || isLoading || isSaving
  }
)

// Bills
// (TODO: create selector --> ui.bills.disabled)
export const getCookSelectDisabled = createSelector(
  [ getReconciled, getIsLoading, getIsSaving ],
  (reconciled, isLoading, isSaving) => {
    return reconciled || isLoading || isSaving
  }
)

export const getCostInputDisabled = createSelector(
  [ getReconciled, getIsLoading, getIsSaving ],
  (reconciled, isLoading, isSaving) => {
    return reconciled || isLoading || isSaving
  }
)

// Extras Input
// ui.extras.input_disabled
export const getExtrasInputDisabled = createSelector(
  [ getMealStatus, getIsLoading, getIsSaving ],
  (mealStatus, isLoading, isSaving) => {
    return mealStatus !== 'CLOSED' || isLoading || isSaving
  }
)

// ui.extras.input_value
export const getExtrasInputValue = createSelector(
  [ getExtras, getExtrasInputDisabled ],
  (extras, disabled) => {
    if (disabled) return 'n/a'
    if (extras === 0) return ''
    return extras.toString()
  }
)

// Close Button
export const getCloseButtonDisabled = createSelector(
  [ getIsLoading, getIsSaving ],
  (isLoading, isSaving) => {
    return isLoading || isSaving
  }
)

export const getCloseButtonHidden = createSelector(
  [ getOpen, getCurrentTime, getEpoch ],
  (open, currentTime, epoch) => {
    return !open || (epoch - currentTime > fourtyEightHours)
  }
)

// Auto-Close Checkbox
export const getAutoCloseCheckboxDisabled = createSelector(
  [ getIsLoading, getIsSaving ],
  (isLoading, isSaving) => {
    return isLoading || isSaving
  }
)

export const getAutoCloseCheckboxHidden = createSelector(
  [ getOpen, getEpoch, getCurrentTime ],
  (open, epoch, currentTime) => {
    return !open || (epoch - currentTime) < fourtyEightHours
  }
)

// Attendees
export const getCheckedAttendanceCheckboxDisabled = createSelector(
  [ getOpen, getIsLoading, getIsSaving ],
  (open, isLoading, isSaving) => {
    return !open || isLoading || isSaving
  }
)

export const getUncheckedAttendanceCheckboxDisabled = createSelector(
  [ getIsLoading, getIsSaving, getReconciled, getPassed, getClosed, getExtras ],
  (isLoading, isSaving, reconciled, passed, closed, extras) => {
    return isLoading || isSaving || reconciled || passed || (closed && extras === 0)
  }
)

export const getAttendeeVegCheckboxDisabled = createSelector(
  [ getOpen, getIsLoading, getIsSaving ],
  (open, isLoading, isSaving) => {
    return !open || isLoading || isSaving
  }
)

export const getAttendeeLateCheckboxDisabled = createSelector(
  [ getPassed, getReconciled, getIsLoading, getIsSaving ],
  (passed, reconciled, isLoading, isSaving) => {
    return passed || reconciled || isLoading || isSaving
  }
)

// Guests
export const getAddGuestButtonDisabled = createSelector(
  [ getIsLoading, getIsSaving, getReconciled, getPassed, getClosed, getExtras ],
  (isLoading, isSaving, reconciled, passed, closed, extras) => {
    return isLoading || isSaving || reconciled || passed || (closed && extras === 0)
  }
)

export const getGuestVegCheckboxDisabled = createSelector(
  [ getOpen, getIsLoading, getIsSaving ],
  (open, isLoading, isSaving) => {
    return !open || isLoading || isSaving
  }
)

export const getRemoveGuestButtonDisabled = createSelector(
  [ getOpen, getIsLoading, getIsSaving ],
  (open, isLoading, isSaving) => {
    return !open || isLoading || isSaving
  }
)

// Save Button
export const getSaveButtonDisabled = createSelector(
  [ getIsLoading, getIsSaving ],
  (isLoading, isSaving) => {
    return isLoading || isSaving
  }
)

export const getSaveButtonValue = createSelector(
  [ getIsSaving ],
  (isSaving) => {
    return isSaving ? 'Saving...' : 'Save'
  }
)

// description
export const getPersistedDescription = (state) => state.persistedData.meal.description
export const getCurrentDescription = (state) => state.meal.description

export const getDescriptionHasChanged = createSelector(
  [ getPersistedDescription, getCurrentDescription ],
  (persistedDescription, currentDescription) => {
    return persistedDescription !== currentDescription
  }
)

// max
export const getPersistedMax = (state) => state.persistedData.meal.max
export const getMaxHasChanged = createSelector(
  [ getPersistedMax, getMax ],
  (persistedMax, max) => {
    return persistedMax !== max
  }
)

// auto-close
export const getPersistedAutoClose = (state) => state.persistedData.meal.auto_close
export const getAutoCloseHasChanged = createSelector(
  [ getPersistedAutoClose, getShouldAutoClose ],
  (persistedAutoClose, shouldAutoClose) => {
    return persistedAutoClose !== shouldAutoClose
  }
)

// closed
export const getPersistedClosed = (state) => state.persistedData.meal.closed_in_database
export const getClosedHasChanged = createSelector(
  [ getPersistedClosed, getClosedInDatabase ],
  (persistedClose, closedInDatabase) => {
    return persistedClose !== closedInDatabase
  }
)

// bills
export const getBill1 = (state) => state.bill1
export const getBill2 = (state) => state.bill2
export const getBill3 = (state) => state.bill3
export const getCurrentBills = createSelector(
  [ getBill1, getBill2, getBill3 ],
  (bill1, bill2, bill3) => {
    return [bill1, bill2, bill3]
  }
)

export const getPersistedBills = (state) => state.persistedData.bills

// meal-residents
export const getPersistedMealResidents = (state) => state.persistedData.meal_residents
export const getCurrentMealResidents = (state) => state.mealResidents

// guests
export const getPersistedGuests = (state) => state.persistedData.guests
export const getCurrentGuests = (state) => state.guests

// currentData
export const getCurrentData = createSelector(
  [ getCurrentDescription, getMax, getShouldAutoClose,
    getClosed, getCurrentBills, getCurrentMealResidents,
    getCurrentGuests ],
  (description, max, autoClose,
   closed, bills, mealResidents,
   guests) => {
    return {
      auto_close: autoClose,
      bills: bills,
      closed_in_database: closed,
      description: description,
      guests: guests,
      max: max,
      mealResidents: mealResidents
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
    let residentsArray = residents || []
    let persistedMealResidentsArray = persistedMealResidents || []
    let currentMealResidentsArray = currentMealResidents || []

    const persistedResidentIds = persistedMealResidentsArray.map((p) => p.resident_id)
    const currentResidentIds = currentMealResidentsArray.map((c) => c.resident_id)

    let arr = []
    residentsArray.forEach((resident) => {
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
        arr.push({id: persistedMealResidentsArray[persistedIndex].id, _destroy: true})
        return
      }

      // case 3: exists in persisted and current but is different - update
      let current = currentMealResidentsArray[currentIndex]
      let persisted = persistedMealResidentsArray[persistedIndex]

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
  [ getPersistedBills, getCurrentBills ],
  (persistedBills, currentBills) => {
    let patchObj = []

    _.forEach(currentBills, (bill, index) => {
      if (bill.id !== '') {
        if (bill.resident_id === -1) {
          // DELETE bill
          patchObj.push({id: bill.id, _destroy: true})
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
    const persistedAndCurrent = currentGuestsArray.filter((guest) => guest.id !== undefined)

    // A record is only persisted if there is no matching record in the current array
    const ids = persistedAndCurrent.map((guest) => guest.id)
    const justPersisted = persistedGuestsArray.filter((guest) => ids.indexOf(guest.id) === -1)

    // A record is only current if it does not have an id
    const justCurrent = currentGuestsArray.filter((guest) => guest.id === undefined)

    let patchObj = []

    // DELETE
    _.each(justPersisted, (guest) => {
      patchObj.push({id: guest.id, _destroy: true})
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

const getMealId = (state) => state.meal.id
const getPatchObj = createSelector(
  [ getMealId, getAutoCloseHasChanged, getShouldAutoClose, getBillsPatchObj,
    getClosedHasChanged, getClosedInDatabase, getDescriptionHasChanged, getCurrentDescription,
    getGuestsPatchObj, getMaxHasChanged, getMax, getAttendeePatchObj ],
  (mealId, autoCloseHasChanged, currentAutoClose, billsPatchObj,
    closedHasChanged, closedInDatabase, descriptionHasChanged, currentDescription,
    guestsPatchObj, maxHasChanged, max, attendeePatchObj) => {
    let patchObj = {}

    // auto_close
    if (autoCloseHasChanged) {
      patchObj.auto_close = currentAutoClose
    }

    // closed_in_database
    if (closedHasChanged) {
      patchObj.closed_in_database = closedInDatabase
    }

    // description
    if (descriptionHasChanged) {
      patchObj.description = currentDescription
    }

    // max
    if (maxHasChanged) {
      patchObj.max = max
    }

    // bills
    if (billsPatchObj.length > 0) {
      patchObj.bills_attributes = billsPatchObj
    }

    // guests
    if (guestsPatchObj.length > 0) {
      patchObj.guests_attributes = guestsPatchObj
    }

    // meal_residents (attendees)
    if (attendeePatchObj.length > 0) {
      patchObj.meal_residents_attributes = attendeePatchObj
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
  [ getDataHasChanged, getIsLoading ],
  (dataHasChanged, isLoading) => {
    return !dataHasChanged || isLoading
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

const getCancelButtonDisabled = createSelector(
  [ getIsLoading, getIsSaving ],
  (isLoading, isSaving) => {
    return isLoading || isSaving
  }
)

const getCancelButtonHidden = createSelector(
  [ getDataHasChanged, getIsLoading ],
  (dataHasChanged, isLoading) => {
    return !dataHasChanged || isLoading
  }
)

const getLinksDisabled = createSelector(
  [ getIsSaving ],
  (isSaving) => {
    return isSaving
  }
)

const getLinksHidden = createSelector(
  [ getIsLoading ],
  (isLoading) => {
    return isLoading
  }
)

const mapStateToProps = (state) => {
  return {
    app: state.app,
    meal: state.meal,
    residents: state.residents,
    mealResidents: state.mealResidents,
    bill1: state.bill1,
    bill2: state.bill2,
    bill3: state.bill3,
    guests: state.guests,
    guestModal: state.guestModal,
    persistedData: state.persistedData
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps,
    {
      meta: {
        patchObj: getPatchObj(stateProps)
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
        mealResidents: stateProps.mealResidents,
        guests: stateProps.guests,
        guestModal: stateProps.guestModal
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
        mealResidents: {
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
        guestModal: {
          close: dispatchProps.closeGuestModal,
          toggleVeg: dispatchProps.toggleModalVeg,
          toggleMultiplier: dispatchProps.toggleModalMultiplier,
          addGuest: dispatchProps.addGuest
        }
      },
      ui: {
        menu: {
          textarea_disabled: getMenuTextareaDisabled(stateProps)
        },
        cooks: {
          select_disabled: getCookSelectDisabled(stateProps),
          input_disabled: getCostInputDisabled(stateProps),
          error_message: {
            '1': getCook1ErrorMessage(stateProps),
            '2': getCook2ErrorMessage(stateProps),
            '3': getCook3ErrorMessage(stateProps)
          }
        },
        auto_close_checkbox: {
          hidden: getAutoCloseCheckboxHidden(stateProps),
          disabled: getAutoCloseCheckboxDisabled(stateProps)
        },
        extras: {
          input_value: getExtrasInputValue(stateProps),
          input_disabled: getExtrasInputDisabled(stateProps)
        },
        close_button: {
          hidden: getCloseButtonHidden(stateProps),
          disabled: getCloseButtonDisabled(stateProps)
        },
        attendees: {
          checked_checkbox_disabled: getCheckedAttendanceCheckboxDisabled(stateProps),
          unchecked_checkbox_disabled: getUncheckedAttendanceCheckboxDisabled(stateProps),
          veg_checkbox_disabled: getAttendeeVegCheckboxDisabled(stateProps),
          late_checkbox_disabled: getAttendeeLateCheckboxDisabled(stateProps),
          add_guest_button_disabled: getAddGuestButtonDisabled(stateProps)
        },
        guests: {
          veg_checkbox_disabled: getGuestVegCheckboxDisabled(stateProps),
          remove_button_disabled: getRemoveGuestButtonDisabled(stateProps)
        },
        save_button: {
          disabled: getSaveButtonDisabled(stateProps),
          hidden: getSaveButtonHidden(stateProps),
          value: getSaveButtonValue(stateProps)
        },
        cancel_button: {
          disabled: getCancelButtonDisabled(stateProps),
          hidden: getCancelButtonHidden(stateProps)
        },
        links: {
          disabled: getLinksDisabled(stateProps),
          hidden: getLinksHidden(stateProps)
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

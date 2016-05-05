import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { ignoreActions } from 'redux-ignore'

// Actions
const appActions = ['SET_IS_LOADING', 'SET_IS_SAVING', 'SET_CURRENT_TIME']
const mealActions = ['UPDATE_DESCRIPTION', 'UPDATE_EXTRAS', 'UPDATE_AUTO_CLOSE', 'CLOSE_MEAL', 'REPLACE_MEAL']
const bill1Actions = ['UPDATE_COOK_1', 'UPDATE_COST_1', 'REPLACE_BILL_1']
const bill2Actions = ['UPDATE_COOK_2', 'UPDATE_COST_2', 'REPLACE_BILL_2']
const bill3Actions = ['UPDATE_COOK_3', 'UPDATE_COST_3', 'REPLACE_BILL_3']
const mealResidentsActions = ['ADD_MEAL_RESIDENT', 'REMOVE_MEAL_RESIDENT',
  'TOGGLE_MEAL_RESIDENT_VEG', 'TOGGLE_LATE', 'REPLACE_MEAL_RESIDENTS']
const guestsActions = ['ADD_GUEST', 'REMOVE_GUEST', 'TOGGLE_GUEST_VEG', 'REPLACE_GUESTS']
const guestModalActions = ['OPEN_GUEST_MODAL', 'TOGGLE_MODAL_VEG', 'TOGGLE_MODAL_MULTIPLIER', 'CLOSE_GUEST_MODAL']
const persistedDataActions = ['REPLACE_PERSISTED_DATA']
const residentsActions = ['REPLACE_RESIDENTS']

// Ignore
const appIgnore = mealActions.concat(bill1Actions).concat(bill2Actions)
    .concat(bill3Actions).concat(mealResidentsActions).concat(guestsActions)
    .concat(guestModalActions).concat(persistedDataActions).concat(residentsActions)

const mealIgnore = appActions.concat(bill1Actions).concat(bill2Actions)
    .concat(bill3Actions).concat(mealResidentsActions).concat(guestsActions)
    .concat(guestModalActions).concat(persistedDataActions).concat(residentsActions)

const residentsIgnore = appActions.concat(bill1Actions).concat(bill2Actions)
    .concat(bill3Actions).concat(mealResidentsActions).concat(guestsActions)
    .concat(guestModalActions).concat(persistedDataActions).concat(mealActions)

const bill1Ignore = appActions.concat(residentsActions).concat(bill2Actions)
    .concat(bill3Actions).concat(mealResidentsActions).concat(guestsActions)
    .concat(guestModalActions).concat(persistedDataActions).concat(mealActions)

const bill2Ignore = appActions.concat(residentsActions).concat(bill1Actions)
    .concat(bill3Actions).concat(mealResidentsActions).concat(guestsActions)
    .concat(guestModalActions).concat(persistedDataActions).concat(mealActions)

const bill3Ignore = appActions.concat(residentsActions).concat(bill1Actions)
    .concat(bill2Actions).concat(mealResidentsActions).concat(guestsActions)
    .concat(guestModalActions).concat(persistedDataActions).concat(mealActions)

const mealResidentsIgnore = appActions.concat(residentsActions).concat(bill1Actions)
    .concat(bill2Actions).concat(bill3Actions).concat(guestsActions)
    .concat(guestModalActions).concat(persistedDataActions).concat(mealActions)

const guestsIgnore = appActions.concat(residentsActions).concat(bill1Actions)
    .concat(bill2Actions).concat(bill3Actions).concat(mealResidentsActions)
    .concat(guestModalActions).concat(persistedDataActions).concat(mealActions)

const guestModalIgnore = appActions.concat(residentsActions).concat(bill1Actions)
    .concat(bill2Actions).concat(bill3Actions).concat(mealResidentsActions)
    .concat(guestsActions).concat(persistedDataActions).concat(mealActions)

const persistedDataIgnore = appActions.concat(residentsActions).concat(bill1Actions)
    .concat(bill2Actions).concat(bill3Actions).concat(mealResidentsActions)
    .concat(guestsActions).concat(guestModalActions).concat(mealActions)

// Models
import app from './modules/App'
import meal from './modules/Meal'
import residents from './modules/Residents'
import bill1 from './modules/Bill1'
import bill2 from './modules/Bill2'
import bill3 from './modules/Bill3'
import mealResidents from './modules/MealResidents'
import guests from './modules/Guests'
import guestModal from './modules/GuestModal'
import persistedData from './modules/PersistedData'

export default combineReducers({
  router,
  app: ignoreActions(app, appIgnore),
  meal: ignoreActions(meal, mealIgnore),
  residents: ignoreActions(residents, residentsIgnore),
  bill1: ignoreActions(bill1, bill1Ignore),
  bill2: ignoreActions(bill2, bill2Ignore),
  bill3: ignoreActions(bill3, bill3Ignore),
  mealResidents: ignoreActions(mealResidents, mealResidentsIgnore),
  guests: ignoreActions(guests, guestsIgnore),
  guestModal: ignoreActions(guestModal, guestModalIgnore),
  persistedData: ignoreActions(persistedData, persistedDataIgnore)
})

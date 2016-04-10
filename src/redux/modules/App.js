 /* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SET_INITIAL_DATA_SYNC = 'SET_INITIAL_DATA_SYNC'
export const FETCH_INITIAL_DATA_ASYNC = 'FETCH_INITIAL_DATA_ASYNC'
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_RESPONSE = 'FETCH_RESPONSE'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'
export const MARK_RECORD_AS_CLEAN = 'MARK_RECORD_AS_CLEAN'

// imported constants
import { UPDATE_COOK_1, UPDATE_COST_1 } from './Bill1'
import { UPDATE_COOK_2, UPDATE_COST_2 } from './Bill2'
import { UPDATE_COOK_3, UPDATE_COST_3 } from './Bill3'
import { ADD_GUEST, REMOVE_GUEST, TOGGLE_GUEST_VEG } from './Guests'
import { UPDATE_DESCRIPTION, UPDATE_EXTRAS, UPDATE_AUTO_CLOSE, CLOSE_MEAL } from './Meal'
import { ADD_MEAL_RESIDENT, REMOVE_MEAL_RESIDENT, TOGGLE_MEAL_RESIDENT_VEG, TOGGLE_LATE } from './MealResidents'

// ------------------------------------
// Actions
// ------------------------------------
import type { ResidentSchema } from './Residents'
import type { BillSchema } from './bill'
import type { MealResidentSchema } from './MealResidents'
import type { GuestSchema } from './Guests'

export type InitialStateSchema = {
  id: number,
  description: string,
  date: string,
  epoch: number,
  max: number,
  auto_close: boolean,
  closed: boolean,
  reconciled: boolean,
  hasNext: boolean,
  hasPrev: boolean,
  residents: Array<ResidentSchema>,
  bills: Array<BillSchema>,
  meal_residents: Array<MealResidentSchema>,
  guests: Array<GuestSchema>
};

const dummyInitialData = {
  id: 99,
  description: 'Pizza, salad, and cake',
  date: 'Sat Apr 11, 2016',
  epoch: Date.parse(new Date(2016, 3, 11)),
  max: null,
  auto_close: false,
  closed: false,
  reconciled: false,
  hasNext: false,
  hasPrev: false,
  residents: [
    {id: 1, name: 'David', unit: 'V', vegetarian: false},
    {id: 2, name: 'Laura', unit: 'V', vegetarian: true},
    {id: 3, name: 'George', unit: 'F', vegetarian: false},
    {id: 4, name: 'Jane', unit: 'F', vegetarian: false}
  ],
  bills: [
    {id: 1, resident_id: 1, amount: 53.45}
  ],
  meal_residents: [
    {resident_id: 1, vegetarian: true, late: false},
    {resident_id: 4, vegetarian: false, late: true}
  ],
  guests: [
    {id: 1, resident_id: 4, multiplier: 2, vegetarian: false},
    {id: 2, resident_id: 4, multiplier: 1, vegetarian: true}
  ]
}

export const setInitialDataSync = (payload: InitialStateSchema): Action => ({
  type: SET_INITIAL_DATA_SYNC,
  payload: payload
})

export const fetchRequest = (): Action => ({
  type: FETCH_REQUEST
})

export const fetchResponse = (): Action => ({
  type: FETCH_RESPONSE
})

export const setCurrentTime = (): Action => ({
  type: SET_CURRENT_TIME
})

export const markRecordAsClean = (): Action => ({
  type: MARK_RECORD_AS_CLEAN
})

export const fetchInitialDataAsync = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    dispatch(fetchRequest())

    setTimeout(() => {
      dispatch(setInitialDataSync(dummyInitialData))
      dispatch(fetchResponse())
    }, 2000)
  }
}

export const persistMealAsync = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    dispatch(fetchRequest())

    setTimeout(() => {
      dispatch(markRecordAsClean())
      dispatch(fetchResponse())
    }, 2000)
  }
}

export const actions = {
  setInitialDataSync,
  fetchRequest,
  fetchResponse,
  setCurrentTime,
  markRecordAsClean,
  fetchInitialDataAsync,
  persistMealAsync
}

// ------------------------------------
// Model
// ------------------------------------
export type AppSchema = {
  isFetching: boolean,
  current_time: number,
  hasLoaded: boolean,
  isDirty: boolean
};

const initialState: AppSchema = {
  isFetching: false,
  current_time: Date.now(),
  hasLoaded: false,
  isDirty: false
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_INITIAL_DATA_SYNC]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {hasLoaded: true}),
  [FETCH_REQUEST]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isFetching: true}),
  [FETCH_RESPONSE]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isFetching: false}),
  [SET_CURRENT_TIME]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {current_time: Date.now()}),
  [MARK_RECORD_AS_CLEAN]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: false}),
  [UPDATE_COOK_1]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [UPDATE_COOK_2]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [UPDATE_COOK_3]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [UPDATE_COST_1]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [UPDATE_COST_2]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [UPDATE_COST_3]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [ADD_GUEST]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [REMOVE_GUEST]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [TOGGLE_GUEST_VEG]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [UPDATE_DESCRIPTION]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [UPDATE_EXTRAS]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [UPDATE_AUTO_CLOSE]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [CLOSE_MEAL]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [ADD_MEAL_RESIDENT]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [REMOVE_MEAL_RESIDENT]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [TOGGLE_MEAL_RESIDENT_VEG]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true}),
  [TOGGLE_LATE]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isDirty: true})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function appReducer (state: AppSchema = initialState, action: Action): AppSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

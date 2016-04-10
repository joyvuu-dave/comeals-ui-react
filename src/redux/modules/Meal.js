/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_MEAL = 'FETCH_MEAL'
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const UPDATE_EXTRAS = 'UPDATE_EXTRAS'
export const UPDATE_AUTO_CLOSE = 'UPDATE_AUTO_CLOSE'
export const CLOSE_MEAL = 'CLOSE_MEAL'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchMeal = (payload: string): Action => ({
  type: FETCH_MEAL,
  payload: payload
})

export const updateDescription = (payload: string): Action => ({
  type: UPDATE_DESCRIPTION,
  payload: payload
})

export const updateExtras = (payload: string): Action => ({
  type: UPDATE_EXTRAS,
  payload: payload
})

export const updateAutoClose = (payload: string): Action => ({
  type: UPDATE_AUTO_CLOSE,
  payload: payload
})

export const closeMeal = (payload: string): Action => ({
  type: CLOSE_MEAL
})

export const mealActions = {
  updateDescription,
  updateExtras,
  updateAutoClose,
  closeMeal
}

// ------------------------------------
// Model
// ------------------------------------
export type MealSchema = {
  id: number,
  description: string,
  date: string,
  epoch: number,
  max: number,
  auto_close: boolean,
  closed: boolean,
  reconciled: boolean,
  hasNext: boolean,
  hasPrev: boolean
};

const initialState: MealSchema = {
  id: null,
  description: '',
  date: '',
  epoch: null,
  max: null,
  auto_close: false,
  closed_in_database: false,
  reconciled: false,
  hasNext: false,
  hasPrev: false
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_DESCRIPTION]: (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  [UPDATE_EXTRAS]: (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  [UPDATE_AUTO_CLOSE]: (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  [CLOSE_MEAL]: (state: MealSchema, action): MealSchema => Object.assign({}, state, {closed_in_database: true}),
  ['SET_INITIAL_DATA_SYNC']: (state: MealSchema, action): MealSchema =>
    Object.assign({}, state, {
      id: action.payload.id,
      description: action.payload.description,
      date: action.payload.date,
      epoch: action.payload.epoch,
      max: action.payload.max,
      auto_close: action.payload.auto_close,
      closed_in_database: action.payload.closed_in_database,
      reconciled: action.payload.closed_in_database,
      hasNext: action.payload.hasNext,
      hasPrev: action.payload.hasPrev
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function mealReducer (state: MealSchema = initialState, action: Action): MealSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

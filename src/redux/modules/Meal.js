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

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestMeal = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

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
  current_time: number,
  max: number,
  auto_close: boolean,
  closed: boolean,
  reconciled: boolean,
  hasNext: boolean,
  hasPrev: boolean
};

const initialState: MealSchema = {
  id: 42,
  description: 'Soylent for everyone!',
  date: new Date(2016, 3, 8).toDateString(),
  epoch: Date.parse(new Date(2016, 3, 8)),
  current_time: Date.parse(new Date(2016, 3, 7)),
  max: null,
  auto_close: false,
  closed_in_database: false,
  reconciled: false,
  hasNext: true,
  hasPrev: false
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_DESCRIPTION]: (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  [UPDATE_EXTRAS]: (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  [UPDATE_AUTO_CLOSE]: (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  [CLOSE_MEAL]: (state: MealSchema, action): MealSchema => Object.assign({}, state, {closed_in_database: true})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function mealReducer (state: MealSchema = initialState, action: Action): MealSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

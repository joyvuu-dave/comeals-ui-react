// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const UPDATE_EXTRAS = 'UPDATE_EXTRAS'
export const CLOSE_MEAL = 'CLOSE_MEAL'

// ------------------------------------
// Actions
// ------------------------------------
export const updateDescription = (payload: string): Action => ({
  type: UPDATE_DESCRIPTION,
  payload: payload
})

export const updateExtras = (payload: string): Action => ({
  type: UPDATE_EXTRAS,
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

export const actions = {
  updateDescription,
  updateExtras,
  closeMeal,
  requestMeal
}

// ------------------------------------
// Model
// ------------------------------------
export type MealSchema = {
  id: number,
  description: string,
  date: string,
  epoch: number,
  seconds_before_start: number,
  omnivore: number,
  vegetarian: number,
  late: number,
  extras: number,
  auto_close: boolean,
  status: {
    open: boolean,
    closed: boolean,
    closable: boolean,
    reconciled: boolean,
    hasNext: boolean,
    hasPrev: boolean
  }
};

const initialState: MealSchema = {
  id: 42,
  description: 'lots of food, lol...',
  date: 'Thurs. Nov 4 2016',
  epoch: 1234567890,
  seconds_before_start: 48 * 60 * 60, // value chosen so `Close` button and `Auto-close` checkbox will be hidden
  omnivore: 12,
  vegetarian: 3,
  late: 2,
  extras: 5,
  auto_close: true,
  status: {
    open: true,
    closed: false,
    closable: true,
    reconciled: false,
    hasNext: true,
    hasPrev: false
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  /* eslint-disable max-len */
  [UPDATE_DESCRIPTION]: (state: MealSchema, action): MealSchema => Object.assign({}, state, {description: action.payload}),
  [UPDATE_EXTRAS]: (state: MealSchema, action): MealSchema => Object.assign({}, state, {extras: Number(action.payload)}),
  [CLOSE_MEAL]: (state: MealSchema, action): MealSchema => Object.assign({}, state, Object.assign({}, state.status, {closed: true}))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function mealReducer (state: MealSchema = initialState, action: Action): MealSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

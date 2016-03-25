/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONTYPE = 'ACTIONTYPE'
// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
export const mealResidentsAction = (payload: Object): Action => ({
  type: ACTIONTYPE,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestMealResidents = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const actions = {
  mealResidentsAction,
  requestMealResidents
}

// ------------------------------------
// Model
// ------------------------------------
export type MealResidentSchema = {
  id: number,
  resident_id: number,
  vegetarian: boolean,
  late: boolean
};
export type MealResidentsSchema = Array<MealResidentSchema>;

const initialState: MealResidentsSchema = [
  {id: 1, resident_id: 2, vegetarian: true, late: true}
]

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONTYPE]: (state: MealResidentsSchema, action): MealResidentsSchema => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
/* eslint-disable max-len */
export default function mealResidentsReducer (state: MealResidentsSchema = initialState, action: Action): MealResidentsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

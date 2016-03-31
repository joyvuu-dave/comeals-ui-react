/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema } from './bill'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COOK_3 = 'UPDATE_COOK_3'
export const UPDATE_COST_3 = 'UPDATE_COST_3'
// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
export const updateCook3 = (payload: Object): Action => ({
  type: UPDATE_COOK_3,
  payload: payload
})

export const updateCost3 = (payload: Object): Action => ({
  type: UPDATE_COST_3,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestBill3 = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const actions = {
  updateCook3,
  updateCost3,
  requestBill3
}

// ------------------------------------
// Model
// ------------------------------------
const initialState: BillSchema = {
  id: 33,
  resident_id: 3,
  amount: 333.33
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_COOK_3]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  [UPDATE_COST_3]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill3Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

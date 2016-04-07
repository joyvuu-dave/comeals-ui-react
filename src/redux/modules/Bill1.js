/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema } from './bill'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COOK_1 = 'UPDATE_COOK_1'
export const UPDATE_COST_1 = 'UPDATE_COST_1'
// ------------------------------------
// Actions
// ------------------------------------
export const updateCook1 = (payload: Object): Action => ({
  type: UPDATE_COOK_1,
  payload: payload
})

export const updateCost1 = (payload: Object): Action => ({
  type: UPDATE_COST_1,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestBill1 = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const Bill1Actions = {
  updateCook1,
  updateCost1,
  requestBill1
}

// ------------------------------------
// Model
// ------------------------------------
const initialState: BillSchema = {
  id: 11,
  resident_id: 1,
  amount: 111.11
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_COOK_1]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  [UPDATE_COST_1]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill1Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

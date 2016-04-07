/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema } from './bill'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COOK_2 = 'UPDATE_COOK_2'
export const UPDATE_COST_2 = 'UPDATE_COST_2'
// ------------------------------------
// Actions
// ------------------------------------
export const updateCook2 = (payload: Object): Action => ({
  type: UPDATE_COOK_2,
  payload: payload
})

export const updateCost2 = (payload: Object): Action => ({
  type: UPDATE_COST_2,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestBill2 = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const Bill2Actions = {
  updateCook2,
  updateCost2,
  requestBill2
}

// ------------------------------------
// Model
// ------------------------------------
const initialState: BillSchema = {
  id: 22,
  resident_id: 2,
  amount: 222.22
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_COOK_2]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  [UPDATE_COST_2]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill2Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

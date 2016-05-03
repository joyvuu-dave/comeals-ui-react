/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema, CookPayload, CostPayload } from './bill'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COOK_1 = 'UPDATE_COOK_1'
export const UPDATE_COST_1 = 'UPDATE_COST_1'
export const SHOW_COOK_1_ERRORS = 'SHOW_COOK_1_ERRORS'
// ------------------------------------
// Actions
// ------------------------------------
export const updateCook1 = (payload: CookPayload): Action => ({
  type: UPDATE_COOK_1,
  payload: payload
})

export const updateCost1 = (payload: CostPayload): Action => ({
  type: UPDATE_COST_1,
  payload: payload
})

export const Bill1Actions = {
  updateCook1,
  updateCost1
}

// ------------------------------------
// Model
// ------------------------------------
const initialState: BillSchema = {
  id: '',
  resident_id: -1,
  amount: ''
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['UPDATE_COOK_1']: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  ['UPDATE_COST_1']: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  ['SET_INITIAL_DATA_SYNC']: (state: BillSchema, action): BillSchema => {
    if (action.payload.bills && action.payload.bills.length > 0) {
      return Object.assign({}, action.payload.bills[0])
    } else {
      return Object.assign({}, initialState)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill1Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

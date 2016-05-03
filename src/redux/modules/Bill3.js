/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema, CookPayload, CostPayload } from './bill'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COOK_3 = 'UPDATE_COOK_3'
export const UPDATE_COST_3 = 'UPDATE_COST_3'
// ------------------------------------
// Actions
// ------------------------------------
export const updateCook3 = (payload: CookPayload): Action => ({
  type: UPDATE_COOK_3,
  payload: payload
})

export const updateCost3 = (payload: CostPayload): Action => ({
  type: UPDATE_COST_3,
  payload: payload
})

export const Bill3Actions = {
  updateCook3,
  updateCost3
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
  [UPDATE_COOK_3]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  [UPDATE_COST_3]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  ['SET_INITIAL_DATA_SYNC']: (state: BillSchema, action): BillSchema => {
    if (action.payload.bills && action.payload.bills.length > 2) {
      return Object.assign({}, action.payload.bills[2])
    } else {
      return Object.assign({}, initialState)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill3Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

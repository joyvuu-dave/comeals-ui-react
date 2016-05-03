/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema, CookPayload, CostPayload } from './bill'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COOK_2 = 'UPDATE_COOK_2'
export const UPDATE_COST_2 = 'UPDATE_COST_2'
// ------------------------------------
// Actions
// ------------------------------------
export const updateCook2 = (payload: CookPayload): Action => ({
  type: UPDATE_COOK_2,
  payload: payload
})

export const updateCost2 = (payload: CostPayload): Action => ({
  type: UPDATE_COST_2,
  payload: payload
})

export const Bill2Actions = {
  updateCook2,
  updateCost2
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
  [UPDATE_COOK_2]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  [UPDATE_COST_2]: (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  ['SET_INITIAL_DATA_SYNC']: (state: BillSchema, action): BillSchema => {
    if (action.payload.bills && action.payload.bills.length > 1) {
      return Object.assign({}, action.payload.bills[1])
    } else {
      return Object.assign({}, initialState)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill2Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

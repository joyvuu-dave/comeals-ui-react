/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema } from './schema/schema'

// ------------------------------------
// Actions
// ------------------------------------
type CookPayload = {resident_id: number};
export const updateCook3 = (payload: CookPayload): Action => ({
  type: 'UPDATE_COOK_3',
  payload: payload
})

type CostPayload = {amount: string};
export const updateCost3 = (payload: CostPayload): Action => ({
  type: 'UPDATE_COST_3',
  payload: payload
})

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
  'UPDATE_COOK_3': (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  'UPDATE_COST_3': (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  'REPLACE_BILL_3': (state: BillSchema, action): BillSchema => Object.assign({}, action.payload),
  'RESET_STATE': (state: BillSchema, action): BillSchema => Object.assign({}, initialState)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill3Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

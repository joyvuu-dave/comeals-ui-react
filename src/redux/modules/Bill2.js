/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema } from './schema/schema'

// ------------------------------------
// Actions
// ------------------------------------
type CookPayload = {resident_id: number};
export const updateCook2 = (payload: CookPayload): Action => ({
  type: 'UPDATE_COOK_2',
  payload: payload
})

type CostPayload = {amount: string};
export const updateCost2 = (payload: CostPayload): Action => ({
  type: 'UPDATE_COST_2',
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
  'UPDATE_COOK_2': (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  'UPDATE_COST_2': (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  'REPLACE_BILL_2': (state: BillSchema, action): BillSchema => Object.assign({}, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill2Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

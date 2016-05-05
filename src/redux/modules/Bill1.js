/* @flow */
// ------------------------------------
// Schema Definition
// ------------------------------------
import type { BillSchema } from './schema/schema'

// ------------------------------------
// Actions
// ------------------------------------
type CookPayload = {resident_id: number};
export const updateCook1 = (payload: CookPayload): Action => ({
  type: 'UPDATE_COOK_1',
  payload: payload
})

type CostPayload = {amount: string};
export const updateCost1 = (payload: CostPayload): Action => ({
  type: 'UPDATE_COST_1',
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
  'UPDATE_COOK_1': (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  'UPDATE_COST_1': (state: BillSchema, action): BillSchema => ({...state, ...action.payload}),
  'REPLACE_BILL_1': (state: BillSchema, action): BillSchema => Object.assign({}, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function bill1Reducer (state: BillSchema = initialState, action: Action): BillSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

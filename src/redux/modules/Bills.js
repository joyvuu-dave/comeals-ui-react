/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_BILL = 'UPDATE_BILL'
export const UPDATE_COST = 'UPDATE_COST'

// ------------------------------------
// Actions
// ------------------------------------
export const updateBill = (payload: Object): Action => ({
  type: UPDATE_BILL,
  payload: payload
})

export const updateCost = (payload: Object): Action => ({
  type: UPDATE_COST,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestBills = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const actions = {
  updateBill,
  updateCost,
  requestBills
}

// ------------------------------------
// Model
// ------------------------------------
export type BillSchema = {
  id: number,
  resident_id: number,
  amount: number
};
export type BillsSchema = {
  '1': ?BillSchema,
  '2': ?BillSchema,
  '3': ?BillSchema
};

const initialState: BillsSchema = {
  '1': {
    id: 11,
    resident_id: 1,
    amount: 111.11
  },
  '2': {
    id: 22,
    resident_id: 2,
    amount: 222.22
  },
  '3': {
    id: 33,
    resident_id: 3,
    amount: 333.33
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_BILL]: (state: BillsSchema, action): BillsSchema => {
    if (action.payload.resident_id) {
      if (action.payload.num === 1) {
        /* eslint-disable max-len */
        return Object.assign({}, state, {'1': Object.assign({}, state[action.payload.num], {resident_id: Number(action.payload.resident_id)})})
      } else if (action.payload.num === 2) {
        /* eslint-disable max-len */
        return Object.assign({}, state, {'2': Object.assign({}, state[action.payload.num], {resident_id: Number(action.payload.resident_id)})})
      } else {
        /* eslint-disable max-len */
        return Object.assign({}, state, {'3': Object.assign({}, state[action.payload.num], {resident_id: Number(action.payload.resident_id)})})
      }
    } else {
      return Object.assign({}, state[action.payload.num], null)
    }
  },
  [UPDATE_COST]: (state: BillSchema, action): BillsSchema => {
    if (action.payload.num === 1) {
      /* eslint-disable max-len */
      return Object.assign({}, state, {'1': Object.assign({}, state[action.payload.num], {amount: Number(action.payload.amount)})})
    } else if (action.payload.num === 2) {
      /* eslint-disable max-len */
      return Object.assign({}, state, {'2': Object.assign({}, state[action.payload.num], {amount: Number(action.payload.amount)})})
    } else {
      /* eslint-disable max-len */
      return Object.assign({}, state, {'3': Object.assign({}, state[action.payload.num], {amount: Number(action.payload.amount)})})
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function billsReducer (state: BillsSchema = initialState, action: Action): BillsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

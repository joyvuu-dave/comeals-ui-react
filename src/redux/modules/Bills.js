/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONTYPE = 'ACTIONTYPE'
// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
export const billsAction = (payload: Object): Action => ({
  type: ACTIONTYPE,
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
  billsAction,
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
export type BillsSchema = Array<BillSchema>;

const initialState: BillsSchema = [
    {id: 1, resident_id: 1, amount: 65.42}
]

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONTYPE]: (state: BillsSchema, action): BillsSchema => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function billsReducer (state: BillsSchema = initialState, action: Action): BillsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

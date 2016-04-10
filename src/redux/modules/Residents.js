/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONTYPE = 'ACTIONTYPE'
// ------------------------------------
// Actions
// ------------------------------------
export const residentsAction = (payload: Object): Action => ({
  type: ACTIONTYPE,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestResidents = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const actions = {
  residentsAction,
  requestResidents
}

// ------------------------------------
// Model
// ------------------------------------
export type ResidentSchema = {
  id: number,
  name: string,
  unit: string,
  vegetarian: boolean
};
export type ResidentsSchema = Array<ResidentSchema>;

const initialState: ResidentsSchema = []

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONTYPE]: (state: ResidentsSchema, action): ResidentsSchema => initialState,
  ['SET_INITIAL_DATA_SYNC']: (state: ResidentsSchema, action): ResidentsSchema =>
    Object.assign([], action.payload.residents)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function residentsReducer (state: ResidentsSchema = initialState, action: Action): ResidentsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

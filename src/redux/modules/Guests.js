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
export const guestsAction = (payload: Object): Action => ({
  type: ACTIONTYPE,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestGuests = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const actions = {
  guestsAction,
  requestGuests
}

// ------------------------------------
// Model
// ------------------------------------
export type GuestSchema = {
  id: number,
  host: string,
  category: string,
  vegetarian: boolean
};
export type GuestsSchema = Array<GuestSchema>;

const initialState: GuestsSchema = [
  {id: 1, host: 'Bob', category: 'Adult', vegetarian: false},
  {id: 2, host: 'Julia', category: 'Child', vegetarian: true}
]

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONTYPE]: (state: GuestsSchema, action): GuestsSchema => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function guestsReducer (state: GuestsSchema = initialState, action: Action): GuestsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

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
export const <%= camelEntityName %>Action = (payload: Object): Action => ({
  type: ACTIONTYPE,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const request<%= pascalEntityName %> = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const actions = {
  <%= camelEntityName %>Action,
  request<%= pascalEntityName %>
}

// ------------------------------------
// Model
// ------------------------------------
export type <%= pascalEntityName %>Schema = {};

const initialState: <%= pascalEntityName %>Schema = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ACTIONTYPE]: (state: <%= pascalEntityName %>Schema, action): <%= pascalEntityName %>Schema => ({...state, ...action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function <%= camelEntityName %>Reducer (state: <%= pascalEntityName %>Schema = initialState, action: Action): <%= pascalEntityName %>Schema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

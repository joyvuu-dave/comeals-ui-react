 /* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_RESPONSE = 'FETCH_RESPONSE'
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME'

// ------------------------------------
// Actions
// ------------------------------------
export const fetchRequest = (): Action => ({
  type: FETCH_REQUEST
})

export const fetchResponse = (): Action => ({
  type: FETCH_RESPONSE
})

export const setCurrentTime = (): Action => ({
  type: SET_CURRENT_TIME
})

export const actions = {
  fetchRequest,
  fetchResponse,
  setCurrentTime
}

// ------------------------------------
// Model
// ------------------------------------
export type AppSchema = {
  isFetching: boolean,
  current_time: number
};

const initialState: AppSchema = {
  isFetching: false,
  current_time: Date.now()
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_REQUEST]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isFetching: true}),
  [FETCH_RESPONSE]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {isFetching: false}),
  [SET_CURRENT_TIME]: (state: AppSchema, action): AppSchema => Object.assign({}, state, {current_time: Date.now()})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function appReducer (state: AppSchema = initialState, action: Action): AppSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

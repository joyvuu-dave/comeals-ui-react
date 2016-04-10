/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_GUEST = 'ADD_GUEST'
export const REMOVE_GUEST = 'REMOVE_GUEST'
export const TOGGLE_GUEST_VEG = 'TOGGLE_GUEST_VEG'
// ------------------------------------
// Actions
// ------------------------------------
export const addGuest = (payload: Object): Action => ({
  type: ADD_GUEST,
  payload: payload
})

export const removeGuest = (payload: Object): Action => ({
  type: REMOVE_GUEST,
  payload: payload
})

export const toggleGuestVeg = (payload: Object): Action => ({
  type: TOGGLE_GUEST_VEG,
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
  addGuest,
  removeGuest,
  toggleGuestVeg,
  requestGuests
}

// ------------------------------------
// Model
// ------------------------------------
export type GuestSchema = {
  id: string,
  resident_id: number,
  multiplier: number,
  vegetarian: boolean
};
export type GuestsSchema = Array<GuestSchema>;

const initialState: GuestsSchema = []

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_GUEST]: (state: GuestsSchema, action): GuestsSchema => {
    return [
      ...state,
      action.payload
    ]
  },
  [REMOVE_GUEST]: (state: GuestsSchema, action): GuestsSchema =>
    state.filter((guest) => guest.id !== action.payload.id),
  [TOGGLE_GUEST_VEG]: (state: GuestsSchema, action): GuestsSchema => {
    return state.map((guest) => {
      if (guest.id !== action.payload.id) {
        return guest
      } else {
        return Object.assign({}, guest, {vegetarian: !guest.vegetarian})
      }
    })
  },
  ['SET_INITIAL_DATA_SYNC']: (state: GuestSchema, action): GuestsSchema =>
    Object.assign([], action.payload.guests)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function guestsReducer (state: GuestsSchema = initialState, action: Action): GuestsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

/* @flow */
import uuid from 'uuid'
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

export const actions = {
  addGuest,
  removeGuest,
  toggleGuestVeg
}

// ------------------------------------
// Model
// ------------------------------------
export type GuestSchema = {
  id: number,
  cid: string,
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
    const cid = uuid.v1()
    return [
      ...state,
      Object.assign({}, action.payload, {cid: cid})
    ]
  },
  [REMOVE_GUEST]: (state: GuestsSchema, action): GuestsSchema =>
    state.filter((guest) => guest.cid !== action.payload.cid),
  [TOGGLE_GUEST_VEG]: (state: GuestsSchema, action): GuestsSchema => {
    return state.map((guest) => {
      if (guest.cid !== action.payload.cid) {
        return guest
      } else {
        return Object.assign({}, guest, {vegetarian: !guest.vegetarian})
      }
    })
  },
  ['SET_INITIAL_DATA_SYNC']: (state: GuestsSchema, action): GuestsSchema => []
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function guestsReducer (state: GuestsSchema = initialState, action: Action): GuestsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

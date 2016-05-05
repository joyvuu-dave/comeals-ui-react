/* @flow */
import uuid from 'uuid'

// ------------------------------------
// Actions
// ------------------------------------
export const addGuest = (payload: Object): Action => ({
  type: 'ADD_GUEST',
  payload: payload
})

export const removeGuest = (payload: Object): Action => ({
  type: 'REMOVE_GUEST',
  payload: payload
})

type ToggleGuestVegPayload = {cid: number};
export const toggleGuestVeg = (payload: ToggleGuestVegPayload): Action => ({
  type: 'TOGGLE_GUEST_VEG',
  payload: payload
})

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
  'ADD_GUEST': (state: GuestsSchema, action): GuestsSchema => {
    const cid = uuid.v1()
    return [
      ...state,
      Object.assign({}, action.payload, {cid: cid})
    ]
  },
  'REMOVE_GUEST': (state: GuestsSchema, action): GuestsSchema =>
    state.filter((guest) => guest.cid !== action.payload.cid),
  'TOGGLE_GUEST_VEG': (state: GuestsSchema, action): GuestsSchema => {
    return state.map((guest) => {
      if (guest.cid !== action.payload.cid) {
        return guest
      } else {
        return Object.assign({}, guest, {vegetarian: !guest.vegetarian})
      }
    })
  },
  'REPLACE_GUESTS': (state: GuestsSchema, action): GuestSchema => Object.assign([], action.payload),
  'RESET_STATE': (state: GuestsSchema, action): GuestsSchema => Object.assign([], initialState)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function guestsReducer (state: GuestsSchema = initialState, action: Action): GuestsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

/* @flow */
// ------------------------------------
// Actions
// ------------------------------------
export const openGuestModal = (payload: Object): Action => ({
  type: 'OPEN_GUEST_MODAL',
  payload: payload
})

export const toggleModalVeg = (): Action => ({
  type: 'TOGGLE_MODAL_VEG'
})

export const toggleModalMultiplier = (): Action => ({
  type: 'TOGGLE_MODAL_MULTIPLIER'
})

export const closeGuestModal = (): Action => ({
  type: 'CLOSE_GUEST_MODAL'
})

// ------------------------------------
// Model
// ------------------------------------
export type GuestModalSchema = {
  open: boolean,
  host: string,
  resident_id: number,
  multiplier: number,
  vegetarian: boolean
};

const initialState: GuestModalSchema = {
  open: false,
  host: '',
  resident_id: -1,
  multiplier: 2,
  vegetarian: false
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  'OPEN_GUEST_MODAL': (state: GuestModalSchema, action): GuestModalSchema => ({...state, ...action.payload}),
  'TOGGLE_MODAL_VEG': (state: GuestModalSchema, action): GuestModalSchema =>
    Object.assign({}, state, {vegetarian: !state.vegetarian}),
  'TOGGLE_MODAL_MULTIPLIER': (state: GuestModalSchema, action): GuestModalSchema =>
    Object.assign({}, state, {multiplier: state.multiplier ^ 3}),
  'CLOSE_GUEST_MODAL': (state: GuestModalSchema, action): GuestModalSchema => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function guestModalReducer (state: GuestModalSchema = initialState, action: Action): GuestModalSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

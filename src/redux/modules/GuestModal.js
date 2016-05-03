/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const OPEN_GUEST_MODAL = 'OPEN_GUEST_MODAL'
export const TOGGLE_MODAL_VEG = 'TOGGLE_MODAL_VEG'
export const TOGGLE_MODAL_MULTIPLIER = 'TOGGLE_MODAL_MULTIPLIER'
export const CLOSE_GUEST_MODAL = 'CLOSE_GUEST_MODAL'
// ------------------------------------
// Actions
// ------------------------------------
export const openGuestModal = (payload: Object): Action => ({
  type: OPEN_GUEST_MODAL,
  payload: payload
})

export const toggleModalVeg = (payload: Object): Action => ({
  type: TOGGLE_MODAL_VEG
})

export const toggleModalMultiplier = (payload: Object): Action => ({
  type: TOGGLE_MODAL_MULTIPLIER
})

export const closeGuestModal = (): Action => ({
  type: CLOSE_GUEST_MODAL
})

export const actions = {
  openGuestModal,
  toggleModalVeg,
  toggleModalMultiplier,
  closeGuestModal
}

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
  [OPEN_GUEST_MODAL]: (state: GuestModalSchema, action): GuestModalSchema => ({...state, ...action.payload}),
  [TOGGLE_MODAL_VEG]: (state: GuestModalSchema, action): GuestModalSchema =>
    Object.assign({}, state, {vegetarian: !state.vegetarian}),
  [TOGGLE_MODAL_MULTIPLIER]: (state: GuestModalSchema, action): GuestModalSchema =>
    Object.assign({}, state, {multiplier: state.multiplier ^ 3}),
  [CLOSE_GUEST_MODAL]: (state: GuestModalSchema, action): GuestModalSchema => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function guestModalReducer (state: GuestModalSchema = initialState, action: Action): GuestModalSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

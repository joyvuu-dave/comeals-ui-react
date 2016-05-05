/* @flow */
// ------------------------------------
// Actions
// ------------------------------------
type DescriptionPayload = {description: string};
export const updateDescription = (payload: DescriptionPayload): Action => ({
  type: 'UPDATE_DESCRIPTION',
  payload: payload
})

type ExtrasPayload = {max: number};
export const updateExtras = (payload: ExtrasPayload): Action => ({
  type: 'UPDATE_EXTRAS',
  payload: payload
})

type AutoClosePayload = {auto_close: boolean};
export const updateAutoClose = (payload: AutoClosePayload): Action => ({
  type: 'UPDATE_AUTO_CLOSE',
  payload: payload
})

export const closeMeal = (): Action => ({
  type: 'CLOSE_MEAL'
})

// ------------------------------------
// Model
// ------------------------------------
export type MealSchema = {
  id: number,
  description: string,
  date: string,
  epoch: number,
  max: number,
  auto_close: boolean,
  closed: boolean,
  reconciled: boolean,
  prevId: number,
  nextId: number
};

const initialState: MealSchema = {
  id: null,
  description: '',
  date: '',
  epoch: null,
  max: null,
  auto_close: false,
  closed_in_database: false,
  reconciled: false,
  prevId: '',
  nextId: ''
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  'UPDATE_DESCRIPTION': (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  'UPDATE_EXTRAS': (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  'UPDATE_AUTO_CLOSE': (state: MealSchema, action): MealSchema => ({...state, ...action.payload}),
  'CLOSE_MEAL': (state: MealSchema, action): MealSchema => Object.assign({}, state, {closed_in_database: true}),
  'REPLACE_MEAL': (state: MealSchema, action): MealSchema => Object.assign({}, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function mealReducer (state: MealSchema = initialState, action: Action): MealSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

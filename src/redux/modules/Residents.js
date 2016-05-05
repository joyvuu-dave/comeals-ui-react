/* @flow */
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
  'REPLACE_RESIDENTS': (state: ResidentsSchema, action): ResidentsSchema => Object.assign([], action.payload),
  'RESET_STATE': (state: ResidentsSchema, action): ResidentsSchema => Object.assign([], initialState)
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function residentsReducer (state: ResidentsSchema = initialState, action: Action): ResidentsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

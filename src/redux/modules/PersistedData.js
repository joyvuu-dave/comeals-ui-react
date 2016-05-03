/* @flow */
// Schemas
type BillSchema = {
  id: number,
  resident_id: number,
  amount: string
};

type MealResidentSchema = {
  id: number,
  resident_id: number,
  vegetarian: boolean,
  late: boolean
};

type GuestSchema = {
  id: number,
  resident_id: number,
  multiplier: number,
  vegetarian: boolean
};

type PersistedDataSchema = {
  description: string,
  max: number,
  auto_close: boolean,
  closed: boolean,
  bills: Array<BillSchema>,
  meal_residents: Array<MealResidentSchema>,
  guests: Array<GuestSchema>
};

// Initial State
const initialState = {}

const ACTION_HANDLERS = {
  ['SET_INITIAL_DATA_SYNC']: (state: PersistedDataSchema, action) =>
    Object.assign({}, {
      auto_close: action.payload.auto_close,
      bills: action.payload.bills,
      closed_in_database: action.payload.closed_in_database,
      description: action.payload.description,
      guests: action.payload.guests,
      max: action.payload.max,
      meal_residents: action.payload.meal_residents
    })
}

export default function persistedDataReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

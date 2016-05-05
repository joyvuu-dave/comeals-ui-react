/* @flow */
// Schemas
type MealSchema = {
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

type ResidentSchema = {
  id: number,
  name: string,
  unit: string,
  vegetarian: boolean
};

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
  meal: MealSchema,
  residents: Array<ResidentSchema>,
  bills: Array<BillSchema>,
  meal_residents: Array<MealResidentSchema>,
  guests: Array<GuestSchema>
};

// Initial State
const initialState = {
  meal: {
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
  },
  residents: [],
  bills: [],
  meal_residents: [],
  guests: []
}

const ACTION_HANDLERS = {
  'REPLACE_PERSISTED_DATA': (state: PersistedDataSchema, action): PersistedDataSchema =>
    Object.assign({}, action.payload)
}

export default function persistedDataReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

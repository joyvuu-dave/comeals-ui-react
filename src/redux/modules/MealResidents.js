/* @flow */
// ------------------------------------
// Actions
// ------------------------------------
export const addMealResident = (payload: Object): Action => ({
  type: 'ADD_MEAL_RESIDENT',
  payload: payload
})

type RemoveMealResidentPayload = {resident_id: number};
export const removeMealResident = (payload: RemoveMealResidentPayload): Action => ({
  type: 'REMOVE_MEAL_RESIDENT',
  payload: payload
})

type ToggleMealResidentVegPayload = {resident_id: number};
export const toggleMealResidentVeg = (payload: ToggleMealResidentVegPayload): Action => ({
  type: 'TOGGLE_MEAL_RESIDENT_VEG',
  payload: payload
})

type ToggleLatePayload = {resident_id: number};
export const toggleLate = (payload: ToggleLatePayload): Action => ({
  type: 'TOGGLE_LATE',
  payload: payload
})

// ------------------------------------
// Model
// ------------------------------------
export type MealResidentSchema = {
  resident_id: number,
  vegetarian: boolean,
  late: boolean
};

export type MealResidentsSchema = Array<MealResidentSchema>;

const initialState: MealResidentsSchema = []

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  'ADD_MEAL_RESIDENT': (state: MealResidentsSchema, action): MealResidentsSchema => {
    return [
      ...state,
      {resident_id: action.payload.resident_id, vegetarian: action.payload.vegetarian, late: false}
    ]
  },
  'REMOVE_MEAL_RESIDENT': (state: MealResidentsSchema, action): MealResidentsSchema =>
    state.filter((mealResident) => mealResident.resident_id !== action.payload.resident_id),
  'TOGGLE_MEAL_RESIDENT_VEG': (state: MealResidentsSchema, action): MealResidentsSchema => {
    return state.map((mealResident) => {
      if (mealResident.resident_id !== action.payload.resident_id) {
        return mealResident
      } else {
        return Object.assign({}, mealResident, {vegetarian: !mealResident.vegetarian})
      }
    })
  },
  'TOGGLE_LATE': (state: MealResidentsSchema, action): MealResidentsSchema => {
    return state.map((mealResident) => {
      if (mealResident.resident_id !== action.payload.resident_id) {
        return mealResident
      } else {
        return Object.assign({}, mealResident, {late: !mealResident.late})
      }
    })
  },
  'REPLACE_MEAL_RESIDENTS': (state: MealResidentsSchema, action): MealResidentsSchema =>
    Object.assign([], action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
/* eslint-disable max-len */
export default function mealResidentsReducer (state: MealResidentsSchema = initialState, action: Action): MealResidentsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

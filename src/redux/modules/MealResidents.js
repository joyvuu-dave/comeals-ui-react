/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_MEAL_RESIDENT = 'ADD_MEAL_RESIDENT'
export const REMOVE_MEAL_RESIDENT = 'REMOVE_MEAL_RESIDENT'
export const TOGGLE_MEAL_RESIDENT_VEG = 'TOGGLE_MEAL_RESIDENT_VEG'
export const TOGGLE_LATE = 'TOGGLE_LATE'
// ------------------------------------
// Actions
// ------------------------------------
export const addMealResident = (payload: number): Action => ({
  type: ADD_MEAL_RESIDENT,
  payload: payload
})

export const removeMealResident = (payload: number): Action => ({
  type: REMOVE_MEAL_RESIDENT,
  payload: payload
})

export const toggleMealResidentVeg = (payload: id): Action => ({
  type: TOGGLE_MEAL_RESIDENT_VEG,
  payload: payload
})

export const toggleLate = (payload: id): Action => ({
  type: TOGGLE_LATE,
  payload: payload
})

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action and let the
// reducer take care of this logic.
export const requestMealResidents = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
  }
}

export const actions = {
  addMealResident,
  removeMealResident,
  toggleMealResidentVeg,
  toggleLate
}

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
  [ADD_MEAL_RESIDENT]: (state: MealResidentsSchema, action): MealResidentsSchema => {
    return [
      ...state,
      {resident_id: action.payload.resident_id, vegetarian: action.payload.vegetarian, late: false}
    ]
  },
  [REMOVE_MEAL_RESIDENT]: (state: MealResidentsSchema, action): MealResidentsSchema =>
    state.filter((meal_resident) => meal_resident.resident_id !== action.payload.resident_id),
  [TOGGLE_MEAL_RESIDENT_VEG]: (state: MealResidentsSchema, action): MealResidentsSchema => {
    return state.map((meal_resident) => {
      if (meal_resident.resident_id !== action.payload.resident_id) {
        return meal_resident
      } else {
        return Object.assign({}, meal_resident, {vegetarian: !meal_resident.vegetarian})
      }
    })
  },
  [TOGGLE_LATE]: (state: MealResidentsSchema, action): MealResidentsSchema => {
    return state.map((meal_resident) => {
      if (meal_resident.resident_id !== action.payload.resident_id) {
        return meal_resident
      } else {
        return Object.assign({}, meal_resident, {late: !meal_resident.late})
      }
    })
  },
  ['SET_INITIAL_DATA_SYNC']: (state: MealResidentsSchema, action): MealResidentsSchema =>
    Object.assign([], action.payload.meal_residents)
}

// ------------------------------------
// Reducer
// ------------------------------------
/* eslint-disable max-len */
export default function mealResidentsReducer (state: MealResidentsSchema = initialState, action: Action): MealResidentsSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

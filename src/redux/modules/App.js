 /* @flow */
// ------------------------------------
// Dummy Initial Data
// ------------------------------------
import { DUMMY_DATA } from './data/index'

// API Stuff
import { polyfill } from 'es6-promise'
polyfill()
import 'isomorphic-fetch'

// ------------------------------------
// Actions
// ------------------------------------
import type { ResidentSchema } from './Residents'
import type { BillSchema } from './bill'
import type { MealResidentSchema } from './MealResidents'
import type { GuestSchema } from './Guests'

export type InitialStateSchema = {
  id: number,
  description: string,
  date: string,
  epoch: number,
  max: number,
  auto_close: boolean,
  closed: boolean,
  reconciled: boolean,
  prevId: number,
  nextId: number,
  residents: Array<ResidentSchema>,
  bills: Array<BillSchema>,
  meal_residents: Array<MealResidentSchema>,
  guests: Array<GuestSchema>
};

export const setInitialDataSync = (payload: InitialStateSchema): Action => ({
  type: 'SET_INITIAL_DATA_SYNC',
  payload: payload
})

export const fetchRequest = (): Action => ({
  type: 'FETCH_REQUEST'
})

export const fetchResponse = (): Action => ({
  type: 'FETCH_RESPONSE'
})

export const setCurrentTime = (): Action => ({
  type: 'SET_CURRENT_TIME'
})

export const setIsLoading = (): Action => ({
  type: 'SET_IS_LOADING'
})

export const setIsSaving = (): Action => ({
  type: 'SET_IS_SAVING'
})

export const fetchMealAsync = (id): Function => {
  return (dispatch: Function, getState: Function) => {
    dispatch(setIsLoading({isLoading: true}))

    setTimeout(() => {
      fetch(`http://localhost:3001/api/meals/${id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setInitialDataSync(json))

        // set guests
        const guests = json.guests
        guests.forEach((guest) => {
          dispatch({
            type: 'ADD_GUEST',
            payload: guest
          })
        })
      })
    }, 2000)

    dispatch(setIsLoading({isLoading: false}))
  }
}

export const persistMealAsync = (patchObj): Function => {
  return (dispatch: Function, getState: Function) => {
    dispatch(setIsSaving({isSaving: true}))

    setTimeout(() => {
      fetch('/users', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patchObj)
      })
      .then((response) => response.json())
      .then((json) => {
        dispatch(setInitialDataSync(json))

        // set guests
        const guests = json.guests
        guests.forEach((guest) => {
          dispatch({
            type: 'ADD_GUEST',
            payload: guest
          })
        })
      })
    }, 2000)

    dispatch(setIsSaving({isSaving: false}))
  }
}

export const cancelChanges = (persistedData): Function => {
  return (dispatch: Function, getState: Function) => {
    dispatch(setInitialDataSync(persistedData))

    // set guests
    const guests = persistedData.guests
    guests.forEach((guest) => {
      dispatch({
        type: 'ADD_GUEST',
        payload: guest
      })
    })
  }
}

export const actions = {
  setInitialDataSync,
  setCurrentTime,
  fetchMealAsync,
  persistMealAsync,
  cancelChanges
}

// ------------------------------------
// Model
// ------------------------------------
export type AppSchema = {
  isLoading: boolean,
  isSaving: boolean,
  currentTime: number
};

const initialState: AppSchema = {
  isLoading: false,
  isSaving: false,
  currentTime: Date.now()
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['SET_IS_LOADING']: (state: AppSchema, action): AppSchema => Object.assign({}, state, action.payload),
  ['SET_IS_SAVING']: (state: AppSchema, action): AppSchema => Object.assign({}, state, action.payload),
  ['SET_CURRENT_TIME']: (state: AppSchema, action): AppSchema => Object.assign({}, state, {currentTime: Date.now()})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function appReducer (state: AppSchema = initialState, action: Action): AppSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

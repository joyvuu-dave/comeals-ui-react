 /* @flow */
// API Stuff
import { polyfill } from 'es6-promise'
polyfill()
import 'isomorphic-fetch'

// ------------------------------------
// Actions
// ------------------------------------
import type {
  BillSchema,
  GuestSchema,
  MealResidentSchema,
  ResidentSchema
} from './schema/schema'

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
  mealResidents: Array<MealResidentSchema>,
  guests: Array<GuestSchema>
};

export const setCurrentTime = (): Action => ({
  type: 'SET_CURRENT_TIME'
})

export const setIsLoading = (payload): Action => ({
  type: 'SET_IS_LOADING',
  payload: payload
})

export const setIsSaving = (payload): Action => ({
  type: 'SET_IS_SAVING',
  payload: payload
})

function setData (dispatch, data) {
  // dispatch({type: 'RESET_STATE'})

  // persisted data
  // Fixme: currently this must happen before we can dipatch
  //        ADD_GUESTS or there will be an error due to
  //        the logic of the reducer that creates the guest patch object
  dispatch({type: 'REPLACE_PERSISTED_DATA', payload: data})

  // meal
  dispatch({type: 'REPLACE_MEAL', payload: data.meal})

  // bill1
  if (data.bills.length > 0) {
    dispatch({type: 'REPLACE_BILL_1', payload: data.bills[0]})
  }

  // bill2
  if (data.bills.length > 1) {
    dispatch({type: 'REPLACE_BILL_2', payload: data.bills[1]})
  }

  // bill3
  if (data.bills.length > 2) {
    dispatch({type: 'REPLACE_BILL_3', payload: data.bills[2]})
  }

  // residents
  dispatch({type: 'REPLACE_RESIDENTS', payload: data.residents || []})

  // meal_residents
  dispatch({type: 'REPLACE_MEAL_RESIDENTS', payload: data.meal_residents || []})

  // guests
  dispatch({type: 'REPLACE_GUESTS', payload: []})
  const guests = data.guests || []
  guests.forEach((guest) => {
    dispatch({
      type: 'ADD_GUEST',
      payload: guest
    })
  })
}

export const fetchMealAsync = (id): Function => {
  return (dispatch: Function, getState: Function) => {
    dispatch(setIsLoading({isLoading: true}))

    setTimeout(() => {
      fetch(`http://localhost:3001/api/meals/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setData(dispatch, json)
        dispatch(setIsLoading({isLoading: false}))
      })
    }, 2000)
  }
}

export const persistMealAsync = (id, patchObj): Function => {
  return (dispatch: Function, getState: Function) => {
    dispatch(setIsSaving({isSaving: true}))

    const patchObjWithId = Object.assign({}, patchObj, {id: id})
    const fullPatchObj = Object.assign({}, {meal: patchObjWithId})

    setTimeout(() => {
      fetch(`http://localhost:3001/api/meals/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullPatchObj)
      })
      .then((response) => response.json())
      .then((json) => {
        setData(dispatch, json)
        dispatch(setIsSaving({isSaving: false}))
      })
    }, 2000)
  }
}

export const cancelChanges = (): Function => {
  return (dispatch: Function, getState: Function) => {
    const persistedData = getState().persistedData
    setData(dispatch, persistedData)
  }
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
  'SET_IS_LOADING': (state: AppSchema, action): AppSchema => Object.assign({}, state, action.payload),
  'SET_IS_SAVING': (state: AppSchema, action): AppSchema => Object.assign({}, state, action.payload),
  'SET_CURRENT_TIME': (state: AppSchema, action): AppSchema => Object.assign({}, state, {currentTime: Date.now()})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function appReducer (state: AppSchema = initialState, action: Action): AppSchema {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

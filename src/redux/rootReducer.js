import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

// Models
import app from './modules/App'
import meal from './modules/Meal'
import residents from './modules/Residents'
import bill1 from './modules/Bill1'
import bill2 from './modules/Bill2'
import bill3 from './modules/Bill3'
import meal_residents from './modules/MealResidents'
import guests from './modules/Guests'

export default combineReducers({
  router,
  app,
  meal,
  residents,
  bill1,
  bill2,
  bill3,
  meal_residents,
  guests
})

import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

// Models
import meal from './modules/Meal'
import residents from './modules/Residents'
import bills from './modules/Bills'
import meal_residents from './modules/MealResidents'
import guests from './modules/Guests'

export default combineReducers({
  router,
  meal,
  residents,
  bills,
  meal_residents,
  guests
})

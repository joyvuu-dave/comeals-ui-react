import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import MealView from 'views/MealView/MealView'
import CalendarView from 'views/CalendarView/CalendarView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={CalendarView} />
    <Route path='/meals/:id' component={MealView} />
  </Route>
)

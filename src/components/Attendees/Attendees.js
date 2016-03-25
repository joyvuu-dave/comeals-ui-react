/* @flow */
// rendered by MealView
import React from 'react'
import classes from './Attendees.scss'

// Components
import AttendeesTable from '../AttendeesTable/AttendeesTable'

// Schema
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { MealResidentsSchema } from '../../redux/modules/MealResidents'

type Props = {
  residents: ResidentsSchema,
  meal_residents: MealResidentsSchema
};

export class Attendees extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.attendees}>
        <h3 className={classes['attendees-title']}>Attendees</h3>
        <AttendeesTable residents={this.props.residents} meal_residents={this.props.meal_residents} />
      </section>
    )
  }
}

export default Attendees

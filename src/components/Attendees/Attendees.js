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
  ui: Object,
  actions: Object,
  residents: ResidentsSchema,
  mealResidents: MealResidentsSchema
};

export class Attendees extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.attendees}>
        <h3 className={classes['attendees-title']}>Attendees</h3>
        <AttendeesTable
          ui={this.props.ui}
          actions={this.props.actions}
          residents={this.props.residents}
          mealResidents={this.props.mealResidents} />
      </section>
    )
  }
}

export default Attendees

// rendered by MealView
import React from 'react'
import classes from './Guests.scss'

// Components
import GuestsTable from '../GuestsTable/GuestsTable'

// Schemas
import type { GuestsSchema } from '../../redux/modules/Guests'
import type { ResidentsSchema } from '../../redux/modules/Residents'

type Props = {
  ui: Object,
  actions: {
    remove: Function,
    toggleVeg: Function
  },
  guests: GuestsSchema,
  residents: ResidentsSchema
};
export class Guests extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.guests}>
        <h3 className={classes['guest-title']}>Guests</h3>
        <GuestsTable
          ui={this.props.ui}
          actions={this.props.actions}
          guests={this.props.guests}
          residents={this.props.residents} />
      </section>
    )
  }
}

export default Guests


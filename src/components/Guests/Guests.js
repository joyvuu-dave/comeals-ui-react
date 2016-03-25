// rendered by MealView
import React from 'react'
import classes from './Guests.scss'

// Components
import GuestsTable from '../GuestsTable/GuestsTable'

// Schemas
import type { GuestsSchema } from '../../redux/modules/Guests'

type Props = {
  guests: GuestsSchema
};
export class Guests extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.guests}>
        <h3 className={classes['guest-title']}>Guests</h3>
        <GuestsTable guests={this.props.guests} />
      </section>
    )
  }
}

export default Guests


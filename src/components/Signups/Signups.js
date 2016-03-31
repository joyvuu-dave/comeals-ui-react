// rendered by MealView
import React from 'react'
import classes from './Signups.scss'

type Props = {
  attendees: number,
  omnivores: number,
  vegetarians: number,
  late: number
};

export class Signups extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.signups}>
        <div className={classes['signups-container']}>
          <strong>Signed Up</strong>
          <h3 className={classes.circle}>{this.props.attendees}</h3>
          <ul>
            <li>{this.props.omnivores} Omnivore</li>
            <li>{this.props.vegetarians} Vegetarian</li>
            <li>{this.props.late} Late</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default Signups

// rendered by MealView
import React from 'react'
import classes from './Signups.scss'

type Props = {
  omnivore: number,
  vegetarian: number,
  late: number
};

export class Signups extends React.Component<void, Props, void> {
  signedUp () {
    return this.props.omnivore + this.props.vegetarian
  }

  render () {
    return (
      <section className={classes.signups}>
        <div className={classes['signups-container']}>
          <strong>Signed Up</strong>
          <h3 className={classes.circle}>{this.signedUp()}</h3>
          <ul>
            <li>{this.props.omnivore} Omnivore</li>
            <li>{this.props.vegetarian} Vegetarian</li>
            <li>{this.props.late} Late</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default Signups

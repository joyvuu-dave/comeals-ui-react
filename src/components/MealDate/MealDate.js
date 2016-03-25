// rendered by DateBox
import React from 'react'
import classes from './MealDate.scss'

type Props = {
  date: string
};

export class MealDate extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes['meal-date']}>{this.props.date}</section>
    )
  }
}

export default MealDate

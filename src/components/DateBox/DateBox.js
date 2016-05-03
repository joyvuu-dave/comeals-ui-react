// rendered by MealView
import React from 'react'
import classes from './DateBox.scss'

// Components
import MealDate from '../MealDate/MealDate'
import PrevNext from '../PrevNext/PrevNext'
import Status from '../Status/Status'
import SaveButton from '../SaveButton/SaveButton'
import CancelButton from '../CancelButton/CancelButton'

type Props = {
  meal_id: number,
  date: string,
  prevId: number,
  nextId: number,
  status: string,
  ui: {
    disabled: boolean,
    hidden: boolean,
    value: string
  },
  persistMealAsync: Function,
  cancelChanges: Function
};

export class DateBox extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes['date-box']}>
        <div className={classes['date_box_container']}>
          <MealDate date={this.props.date} />
          <PrevNext
            prevId={this.props.prevId}
            nextId={this.props.nextId}
            meal_id={this.props.meal_id} />
          <Status status={this.props.status} />
          <CancelButton
            ui={this.props.ui}
            cancelChanges={this.props.cancelChanges} />
          {' '}
          <SaveButton
            ui={this.props.ui}
            persistMealAsync={this.props.persistMealAsync} />
        </div>
      </section>
    )
  }
}

export default DateBox

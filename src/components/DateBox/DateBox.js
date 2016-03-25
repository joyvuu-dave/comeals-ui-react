// rendered by MealView
import React from 'react'
import classes from './DateBox.scss'

// Components
import MealDate from '../MealDate/MealDate'
import PrevNext from '../PrevNext/PrevNext'
import Status from '../Status/Status'

type Props = {
  meal_id: number,
  date: string,
  status: object
};

export class DateBox extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes['date-box']}>
        <div className={classes['date_box_container']}>
          <MealDate date={this.props.date} />
          <PrevNext hasPrev={this.props.status.hasPrev}
            hasNext={this.props.status.hasNext}
            meal_id={this.props.meal_id} />
          <Status reconciled={this.props.status.reconciled}
            closed={this.props.status.closed}
            open={this.props.status.open} />
        </div>
      </section>
    )
  }
}

export default DateBox

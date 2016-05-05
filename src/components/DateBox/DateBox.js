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
  date: string,
  prevId: number,
  nextId: number,
  status: string,
  save_button_ui: {
    disabled: boolean,
    hidden: boolean,
    value: string
  },
  cancel_button_ui: {
    disable: boolean,
    hidden: boolean
  },
  links_ui: {
    disabled: boolean,
    hidden: boolean
  },
  persistMealAsync: Function,
  cancelChanges: Function
};

export class DateBox extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes['date-box']}>
        <div className={classes['date-box-container']}>
          <MealDate date={this.props.date} />
          <PrevNext
            prevId={this.props.prevId}
            nextId={this.props.nextId}
            ui={this.props.links_ui} />
          <Status status={this.props.status} />
          <CancelButton
            ui={this.props.cancel_button_ui}
            cancelChanges={this.props.cancelChanges} />
          {' '}
          <SaveButton
            ui={this.props.save_button_ui}
            persistMealAsync={this.props.persistMealAsync} />
        </div>
      </section>
    )
  }
}

export default DateBox

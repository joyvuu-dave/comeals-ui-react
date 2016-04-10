/* @flow */
// rendered by Datebox
import React from 'react'
import classes from './SaveButton.scss'
import classNames from 'classnames'

type Props = {
  ui: {
    hidden: boolean,
    disabled: boolean,
    value: string
  },
  persistMealAsync: Function
};

export class SaveButton extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.getButtonClasses = this.getButtonClasses.bind(this)
  }

  getButtonClasses () {
    return this.props.ui.hidden
      ? classNames(classes.alert, classes.hide) : classes.alert
  }

  render () {
    return (
      <button
        type='button'
        className={this.getButtonClasses()}
        disabled={this.props.ui.disabled}
        onClick={this.props.persistMealAsync}>{this.props.ui.value}
      </button>
    )
  }
}

export default SaveButton

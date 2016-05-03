/* @flow */
// rendered by Datebox
import React from 'react'
import classes from './CancelButton.scss'
import classNames from 'classnames'

type Props = {
  ui: {
    hidden: boolean,
    disabled: boolean
  },
  cancelChanges: Function
};

export class CancelButton extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.getButtonClasses = this.getButtonClasses.bind(this)
  }

  getButtonClasses () {
    return this.props.ui.hidden
      ? classNames(classes.default, classes.hide) : classes.default
  }

  render () {
    return (
      <button
        type='button'
        className={this.getButtonClasses()}
        disabled={this.props.ui.disabled}
        onClick={this.props.cancelChanges}>Cancel
      </button>
    )
  }
}

export default CancelButton

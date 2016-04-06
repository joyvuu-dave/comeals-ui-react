// rendered by MealView
import React from 'react'
import classes from './Extra.scss'

type Props = {
  // Auto-Close Checkbox
  auto_close: boolean,
  auto_close_checkbox_hidden: boolean,
  auto_close_checkbox_disabled: boolean,
  updateAutoClose: Function,

  // Extras Input Field
  input_value: string,
  input_disabled: boolean,
  updateExtras: Function,
  attendees: number,

  // Close Button
  close_button_hidden: boolean,
  close_button_disabled: boolean,
  closeMeal: Function
};

export class Extra extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleExtrasChange = this.handleExtrasChange.bind(this)
    this.handleAutoCloseChange = this.handleAutoCloseChange.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
  }

  handleExtrasChange (e) {
    this.props.updateExtras({max: Number(e.target.value) + this.props.attendees})
  }

  handleAutoCloseChange (e) {
    this.props.updateAutoClose({auto_close: !this.props.auto_close})
  }

  handleCloseClick (e) {
    this.props.closeMeal()
  }

  render () {
    return (
      <section className={classes.extra}>
        <div className={classes['extra-container']}>

          {/* Extras Input Field */}
          <h3 className={classes['extra-title']}>Extras</h3>
          <input className={classes['extra-input']}
            value={this.props.input_value}
            disabled={this.props.input_disabled}
            onChange={this.handleExtrasChange} />

          {/* Close Button */}
          <button
            type='button'
            hidden={this.props.close_button_hidden}
            disabled={this.props.close_button_disabled}
            onClick={this.handleCloseClick}>Close
          </button>

          {/* Auto-Close Checkbox */}
          <label
            className={classes['auto-close']}
            hidden={this.props.auto_close_checkbox_hidden}>
            <input
              type='checkbox'
              checked={this.props.auto_close}
              disabled={this.props.auto_close_checkbox_disabled}
              onChange={this.handleAutoCloseChange} />{' '}Auto-close 48 hours before meal
          </label>
        </div>
      </section>
    )
  }
}

export default Extra

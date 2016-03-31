// rendered by MealView
import React from 'react'
import classes from './Extra.scss'

function handleAutoCloseChange () {
  console.log('change in auto-close status...')
}

type Props = {
  auto_close: boolean,
  updateExtras: Function,
  closeMeal: Function,
  disabled: boolean,
  value: string
};

export class Extra extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleExtrasChange = this.handleExtrasChange.bind(this)
  }

  handleExtrasChange (e) {
    this.props.updateExtras(e.target.value.toString())
  }

  render () {
    return (
      <section className={classes.extra}>
        <div className={classes['extra-container']}>
          <h3 className={classes['extra-title']}>Extras</h3>
          <input className={classes['extra-input']}
            value={this.props.value}
            onChange={this.handleExtrasChange}
            disabled={this.props.disabled} />
          <button type='button' onClick={this.props.closeMeal}>Close</button>
          <label className={classes['auto-close']}>
            <input type='checkbox'
              defaultChecked={this.props.auto_close}
              onChange={handleAutoCloseChange} />{' '}Auto-close 48 hours before meal
          </label>
        </div>
      </section>
    )
  }
}

export default Extra

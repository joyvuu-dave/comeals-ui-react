// rendered by MealView
import React from 'react'
import classes from './Extra.scss'

function handleAutoCloseChange () {
  console.log('change in auto-close status...')
}

type Props = {
  extras: number,
  auto_close: boolean,
  updateExtras: Function,
  closeMeal: Function
};

export class Extra extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleExtrasChange = this.handleExtrasChange.bind(this)
  }

  handleExtrasChange (e) {
    this.props.updateExtras(e.target.value)
  }

  render () {
    return (
      <section className={classes.extra}>
        <div className={classes['extra-container']}>
          <h3 className={classes['extra-title']}>Extras</h3>
          <input className={classes['extra-input']}
            defaultValue={this.props.extras}
            onChange={this.handleExtrasChange} />
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

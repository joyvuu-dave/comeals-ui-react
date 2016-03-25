// rendered by MealView
import React from 'react'
import classes from './Extra.scss'

function handleInputChange () {
  console.log('extra count change...')
}

function handleMealClose () {
  console.log('close meal...')
}

function handleAutoCloseChange () {
  console.log('change in auto-close status...')
}

type Props = {
  extras: number,
  auto_close: boolean
};

export class Extra extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.extra}>
        <div className={classes['extra-container']}>
          <h3 className={classes['extra-title']}>Extras</h3>
          <input className={classes['extra-input']}
            defaultValue={this.props.extras}
            onChange={handleInputChange} />
          <button type='button' onClick={handleMealClose}>Close</button>
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

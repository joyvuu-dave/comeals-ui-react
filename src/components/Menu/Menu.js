// rendered by MealView
import React from 'react'
import classes from './Menu.scss'

type Props = {
  disabled: boolean,
  description: string,
  updateDescription: Function
};

export class Menu extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.updateDescription({description: e.target.value})
  }

  render () {
    return (
      <textarea
        disabled={this.props.disabled}
        className={classes.menu}
        placeholder='Menu'
        value={this.props.description}
        onChange={this.handleChange}>
      </textarea>
    )
  }
}

export default Menu

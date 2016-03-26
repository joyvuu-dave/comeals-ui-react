// rendered by MealView
import React from 'react'
import classes from './Menu.scss'

type Props = {
  disabled: boolean,
  description: string,
  handleDescriptionUpdate: Function
};

export class Menu extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.handleDescriptionUpdate(e.target.value.trim())
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

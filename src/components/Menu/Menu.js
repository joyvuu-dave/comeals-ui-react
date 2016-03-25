// rendered by MealView
import React from 'react'
import classes from './Menu.scss'

type Props = {
  disabled: boolean,
  description: string,
  handleDescriptionUpdate: Function
};

export class Menu extends React.Component<void, Props, void> {
  render () {
    return (
      <textarea
        disabled={this.props.disabled}
        className={classes.menu}
        placeholder='Menu'
        value={this.props.description}
        onChange={this.props.handleDescriptionUpdate}>
      </textarea>
    )
  }
}

export default Menu

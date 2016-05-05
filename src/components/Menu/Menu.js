// rendered by MealView
import React from 'react'
import classes from './Menu.scss'
import _ from 'lodash'

type Props = {
  disabled: boolean,
  description: string,
  updateDescription: Function
};

export class Menu extends React.Component<void, Props, void> {
  constructor (props) {
    super(props)
    this.state = {description: props.description}
    this.handleChange = this.handleChange.bind(this)
    this.debouncedHandleChange = _.debounce(this.debouncedHandleChange, 500)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({description: nextProps.description})
  }

  handleChange (e) {
    this.setState({description: e.target.value})
    this.debouncedHandleChange(e.target.value)
  }

  debouncedHandleChange (val) {
    this.props.updateDescription({description: val})
  }

  render () {
    return (
      <textarea
        disabled={this.props.disabled}
        className={classes.menu}
        placeholder='Menu'
        value={this.state.description}
        onChange={this.handleChange}>
      </textarea>
    )
  }
}

export default Menu

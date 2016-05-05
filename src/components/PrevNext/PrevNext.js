// rendered by DateBox
import React from 'react'
import { Link } from 'react-router'
import classes from './PrevNext.scss'

type Props = {
  prevId: number,
  nextId: number,
  ui: {
    disabled: boolean,
    hidden: boolean
  }
};

export class PrevNext extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleLinkClick = this.handleLinkClick.bind(this)
  }

  handleLinkClick (event) {
    if (this.props.ui.disabled) {
      event.preventDefault()
    }
  }

  render () {
    return (
      <section>
        <Link
          onClick={this.handleLinkClick}
          className={this.props.prevId && !this.props.ui.hidden ? classes.link : classes.hide}
          to={`/meals/${this.props.prevId}`}>
          <div className={classes['icono-previous']}></div>
          Prev
        </Link>
        {' '}
        <Link
          onClick={this.handleLinkClick}
          className={this.props.nextId && !this.props.ui.hidden ? classes.link : classes.hide}
          to={`/meals/${this.props.nextId}`}>
          Next
          <div className={classes['icono-next']}></div>
        </Link>
        {' '}
        <Link
          onClick={this.handleLinkClick}
          className={this.props.ui.hidden ? classes.hide : classes.link}
          to={'/'}>Calendar</Link>
      </section>
    )
  }
}

export default PrevNext

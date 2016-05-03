// rendered by DateBox
import React from 'react'
import { Link } from 'react-router'
import classes from './PrevNext.scss'

type Props = {
  prevId: number,
  nextId: number,
  meal_id: number
};

export class PrevNext extends React.Component<void, Props, void> {

  render () {
    return (
      <section>
        <Link className={this.props.prevId ? '' : classes['hidden']} to={`/meals/${this.props.prevId}`}>
          <div className={classes['icono-previous']}></div>
          Prev
        </Link>
        {' '}
        <Link className={this.props.nextId ? '' : classes['hidden']} to={`/meals/${this.props.nextId}`}>
          Next
          <div className={classes['icono-next']}></div>
        </Link>
      </section>
    )
  }
}

export default PrevNext

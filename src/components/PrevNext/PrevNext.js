// rendered by DateBox
import React from 'react'
import classes from './PrevNext.scss'

type Props = {
  hasPrev: boolean,
  hasNext: boolean,
  meal_id: number
};

export class PrevNext extends React.Component<void, Props, void> {

  render () {
    return (
      <section>
        <a className={this.props.hasPrev ? '' : classes['hidden']} href={`/meals/${this.props.meal_id}/edit?q=prev`}>
          <div className={classes['icono-previous']}></div>
          Prev
        </a>
        {' '}
        <a className={this.props.hasNext ? '' : classes['hidden']} href={`/meals/${this.props.meal_id}/edit?q=next`}>
          Next
          <div className={classes['icono-next']}></div>
        </a>
      </section>
    )
  }
}

export default PrevNext

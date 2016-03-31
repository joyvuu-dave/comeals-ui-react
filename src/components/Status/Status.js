// rendered by DateBox
import React from 'react'
import classes from './Status.scss'

type Props = {
  status: string
};

export class Status extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes['{this.props.status}']}>
        {this.props.status}
      </section>
    )
  }
}

export default Status

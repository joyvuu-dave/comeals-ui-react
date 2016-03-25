// rendered by DateBox
import React from 'react'
import classes from './Status.scss'

type Props = {
  reconciled: boolean,
  closed: boolean,
  open: boolean
};

export class Status extends React.Component<void, Props, void> {
  renderStatus () {
    if (this.props.reconciled) {
      return (<p className={classes.danger}>RECONCILED</p>)
    }

    if (this.props.closed) {
      return (<p className={classes.warning}>CLOSED</p>)
    }

    if (this.props.open) {
      return (<p className={classes.success}>OPEN</p>)
    }

    return ('')
  }

  render () {
    return (
      <section className={classes.status}>
        {this.renderStatus()}
      </section>
    )
  }
}

export default Status

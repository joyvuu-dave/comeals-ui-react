// rendered by MealView
import React from 'react'
import classes from './Cooks.scss'

// Components
import Cook from '../Cook/Cook'

// Schema
import type { BillsSchema } from '../../redux/modules/Bills'
import type { ResidentsSchema } from '../../redux/modules/Residents'

type Props = {
  bills: BillsSchema,
  residents: ResidentsSchema
};

export class Cooks extends React.Component<void, Props, void> {
  bill1 () {
    if (this.props.bills && this.props.bills.length > 0) {
      return this.props.bills[0]
    } else {
      return null
    }
  }

  bill2 () {
    if (this.props.bills && this.props.bills.length > 1) {
      return this.props.bills[1]
    } else {
      return null
    }
  }

  bill3 () {
    if (this.props.bills && this.props.bills.length > 2) {
      return this.props.bills[2]
    } else {
      return null
    }
  }

  render () {
    return (
      <section className={classes.cooks}>
        <div className={classes['cooks-container']}>
          <h3 className={classes['cooks-title']}>Cooks</h3>
          <Cook bill={this.bill1()} residents={this.props.residents} first='Cook 1' />
          <Cook bill={this.bill2()} residents={this.props.residents} first='Cook 2' />
          <Cook bill={this.bill3()} residents={this.props.residents} first='Cook 3' />
        </div>
      </section>
    )
  }
}

export default Cooks

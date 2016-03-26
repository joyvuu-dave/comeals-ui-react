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
  residents: ResidentsSchema,
  updateBill: Function,
  updateCost: Function
};

export class Cooks extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.cooks}>
        <div className={classes['cooks-container']}>
          <h3 className={classes['cooks-title']}>Cooks</h3>
          <Cook bill={this.props.bills['1']} residents={this.props.residents}
            num={1} updateBill={this.props.updateBill}
            updateCost={this.props.updateCost} />
          <Cook bill={this.props.bills['2']} residents={this.props.residents}
            num={2} updateBill={this.props.updateBill}
            updateCost={this.props.updateCost} />
          <Cook bill={this.props.bills['3']} residents={this.props.residents}
            num={3} updateBill={this.props.updateBill}
            updateCost={this.props.updateCost} />
        </div>
      </section>
    )
  }
}

export default Cooks

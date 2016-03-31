// rendered by MealView
import React from 'react'
import classes from './Cooks.scss'

// Components
import Cook from '../Cook/Cook'

// Schema
import type { BillSchema } from '../../redux/modules/bill'
import type { ResidentsSchema } from '../../redux/modules/Residents'

type Props = {
  bill1: BillSchema,
  bill2: BillSchema,
  bill3: BillSchema,
  residents: ResidentsSchema,
  updateCook1: Function,
  updateCook2: Function,
  updateCook3: Function,
  updateCost1: Function,
  updateCost2: Function,
  updateCost3: Function
};

export class Cooks extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.cooks}>
        <div className={classes['cooks-container']}>
          <h3 className={classes['cooks-title']}>Cooks</h3>
          <Cook bill={this.props.bill1} residents={this.props.residents}
            num={1} updateCook={this.props.updateCook1}
            updateCost={this.props.updateCost1} />
          <Cook bill={this.props.bill2} residents={this.props.residents}
            num={2} updateCook={this.props.updateCook2}
            updateCost={this.props.updateCost2} />
          <Cook bill={this.props.bill3} residents={this.props.residents}
            num={3} updateCook={this.props.updateCook3}
            updateCost={this.props.updateCost3} />
        </div>
      </section>
    )
  }
}

export default Cooks

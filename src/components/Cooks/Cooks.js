// rendered by MealView
import React from 'react'
import classes from './Cooks.scss'

// Components
import Cook from '../Cook/Cook'

// Schema
import type { BillSchema } from '../../redux/modules/bill'
import type { ResidentsSchema } from '../../redux/modules/Residents'

type BillsSchema = {
  '1': BillSchema,
  '2': BillSchema,
  '3': BillSchema
};

type BillActionsSchema = {
  '1': {
    updateCook: Function,
    updateCost: Function
  },
  '2': {
    updateCook: Function,
    updateCost: Function
  },
  '3': {
    updateCook: Function,
    updateCost: Function
  },
  validateBill: Function
};

type Props = {
  ui: {
    select_disabled: boolean,
    input_disabled: boolean,
    error_message: {
      '1': string,
      '2': string,
      '3': string
    }
  },
  residents: ResidentsSchema,
  bills: BillsSchema,
  actions: BillActionsSchema
};

export class Cooks extends React.Component<void, Props, void> {
  render () {
    return (
      <section className={classes.cooks}>
        <div className={classes['cooks-container']}>
          <h3 className={classes['cooks-title']}>Cooks</h3>
          <Cook
            key={1}
            ui={this.props.ui}
            bill={this.props.bills['1']}
            residents={this.props.residents}
            num={1}
            updateCook={this.props.actions['1'].updateCook}
            updateCost={this.props.actions['1'].updateCost} />
          <Cook
            key={2}
            ui={this.props.ui}
            bill={this.props.bills['2']}
            residents={this.props.residents}
            num={2}
            updateCook={this.props.actions['2'].updateCook}
            updateCost={this.props.actions['2'].updateCost} />
          <Cook
            key={3}
            ui={this.props.ui}
            bill={this.props.bills['3']}
            residents={this.props.residents}
            num={3}
            updateCook={this.props.actions['3'].updateCook}
            updateCost={this.props.actions['3'].updateCost} />
        </div>
      </section>
    )
  }
}

export default Cooks

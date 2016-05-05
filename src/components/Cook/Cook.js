// rendered by Cooks
import React from 'react'
import classes from './Cook.scss'

// Schema
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { BillSchema } from '../../redux/modules/bill'

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
  bill: BillSchema,
  residents: ResidentsSchema,
  num: number,
  updateCook: Function,
  updateCost: Function
};

export class Cook extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSelectChange (e) {
    this.props.updateCook({resident_id: Number(e.target.value)})

    if (Number(e.target.value) === -1) {
      this.props.updateCost({amount: ''})
    }
  }

  handleInputChange (e) {
    this.props.updateCost({amount: e.target.value})
  }

  renderOptions () {
    return this.props.residents.map((r) =>
      <option key={r.id} value={r.id}>{r.name}</option>
    )
  }

  render () {
    return (
      <section>
        <select
          className={classes['cook-select']}
          disabled={this.props.ui.select_disabled}
          value={this.props.bill ? this.props.bill.resident_id : -1}
          onChange={this.handleSelectChange}>
          <option key={this.props.num * -10} value={-1}>{`Cook ${this.props.num}`}</option>
          {this.renderOptions()}
        </select>

        $<input
          className={classes['cook-input']}
          disabled={this.props.ui.input_disabled}
          type='string'
          placeholder='food cost'
          value={this.props.bill ? this.props.bill.amount : ''}
          onChange={this.handleInputChange} />
        {' '}
        <span className={classes.alert}>{this.props.ui.error_message[this.props.num]}</span>
      </section>
    )
  }
}

export default Cook

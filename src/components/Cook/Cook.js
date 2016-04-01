// rendered by Cooks
import React from 'react'
import classes from './Cook.scss'

// Schema
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { BillSchema } from '../../redux/modules/bill'

type Props = {
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
  }

  handleInputChange (e) {
    this.props.updateCost({amount: Number(e.target.value)})
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
          value={this.props.bill ? this.props.bill.resident_id : -1}
          onChange={this.handleSelectChange}>
          <option value={-1}>{`Cook ${this.props.num}`}</option>
          {this.renderOptions()}
        </select>

        $<input className={classes['cook-input']}
          type='number'
          min='0'
          max='500'
          step='0.01'
          placeholder='food cost'
          value={this.props.bill ? this.props.bill.amount : 0}
          onChange={this.handleInputChange} />
      </section>
    )
  }
}

export default Cook

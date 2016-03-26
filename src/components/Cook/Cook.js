// rendered by Cooks
import React from 'react'
import classes from './Cook.scss'

// Schema
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { BillSchema } from '../../redux/modules/Bills'

type Props = {
  num: number,
  residents: ResidentsSchema,
  bill: BillSchema,
  updateBill: Function,
  updateCost: Function
};

export class Cook extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSelectChange (e) {
    this.props.updateBill({
      num: this.props.num,
      resident_id: e.target.value
    })
  }

  handleInputChange (e) {
    this.props.updateCost({
      num: this.props.num,
      amount: e.target.value
    })
  }

  renderOptions () {
    return this.props.residents.map((r) =>
      <option key={r.id} value={r.id}>{r.name}</option>
    )
  }

  renderSelectValue () {
    this.props.bill ? this.props.bill.resident_id : ''
  }

  render () {
    return (
      <section>
        <select className={classes['cook-select']}
          defaultValue={this.props.bill ? this.props.bill.resident_id : ''}
          onChange={this.handleSelectChange}>
          <option value=''>Cook {this.props.num}</option>
          {this.renderOptions()}
        </select>

        $<input className={classes['cook-input']}
          type='number'
          min='0'
          max='500'
          step='0.01'
          placeholder='food cost'
          defaultValue={this.props.bill ? this.props.bill.amount : ''}
          onChange={this.handleInputChange} />
      </section>
    )
  }
}

export default Cook

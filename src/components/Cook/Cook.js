// rendered by Cooks
import React from 'react'
import classes from './Cook.scss'

function handleSelectChange () {
  console.log('select changed...')
}

function handleInputChange () {
  console.log('input change...')
}

// Schema
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { BillSchema } from '../../redux/modules/Bills'

type Props = {
  first: string,
  residents: ResidentsSchema,
  bill: BillSchema
};

export class Cook extends React.Component<void, Props, void> {

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
          onChange={handleSelectChange}>
          <option>{this.props.first}</option>
          {this.renderOptions()}
        </select>

        $<input className={classes['cook-input']}
          type='number'
          min='0'
          max='500'
          step='0.01'
          placeholder='food cost'
          defaultValue={this.props.bill ? this.props.bill.amount : ''}
          onChange={handleInputChange} />
      </section>
    )
  }
}

export default Cook

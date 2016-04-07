// rendered by Guests
import React from 'react'
import classes from './GuestsTable.scss'

// Schema
import type { GuestsSchema } from '../../redux/modules/Guests'
import type { ResidentsSchema } from '../../redux/modules/Residents'

type Props = {
  ui: {
    veg_checkbox_disabled: boolean,
    remove_button_disabled: boolean
  },
  actions: {
    remove: Function,
    toggleVeg: Function
  },
  guests: GuestsSchema,
  residents: ResidentsSchema
};

export class GuestsTable extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleToggleVeg = this.handleToggleVeg.bind(this)
    this.handleGuestRemove = this.handleGuestRemove.bind(this)
  }

  handleToggleVeg (e) {
    this.props.actions.toggleVeg({id: e.target.value})
  }

  handleGuestRemove (e) {
    this.props.actions.remove({id: e.target.value})
  }

  renderHost (id) {
    return this.props.residents.find((resident) => {
      return resident.id === id
    }).name
  }

  renderCategory (val) {
    if (val === 1) {
      return 'Child'
    } else {
      return 'Adult'
    }
  }

  renderGuests () {
    return this.props.guests.map((g) =>
      <tr key={g.id} className={classes.guest}>
        <td>{this.renderHost(g.resident_id)}</td>
        <td>{this.renderCategory(g.multiplier)}</td>
        <td>
          <input
            value={g.id}
            disabled={this.props.ui.veg_checkbox_disabled}
            type='checkbox'
            checked={g.vegetarian}
            onChange={this.handleToggleVeg} />
        </td>
        <td>
          <button
            value={g.id}
            disabled={this.props.ui.remove_button_disabled}
            type='button'
            onClick={this.handleGuestRemove}>- Guest</button>
        </td>
      </tr>
    )
  }

  render () {
    return (
      <table className={classes['guests-table']}>
        <thead>
          <tr>
            <th>Host</th>
            <th>Category</th>
            <th>Vegetarian</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.renderGuests()}
        </tbody>
      </table>
    )
  }
}

export default GuestsTable

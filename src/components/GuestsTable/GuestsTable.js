// rendered by Guests
import React from 'react'
import classes from './GuestsTable.scss'

function handleChange () {
  console.log('guest veg checkbox changed...')
}

function handleGuestRemove () {
  console.log('handle guest remove...')
}

// Schema
import type { GuestsSchema } from '../../redux/modules/Guests'

type Props = {
  ui: {
    veg_checkbox_disabled: boolean,
    remove_button_disabled: boolean
  },
  guests: GuestsSchema
};

export class GuestsTable extends React.Component<void, Props, void> {
  renderGuests () {
    return this.props.guests.map((g) =>
      <tr key={g.id} className={classes.guest}>
        <td>{g.host}</td>
        <td>{g.category}</td>
        <td>
          <input
            disabled={this.props.ui.veg_checkbox_disabled}
            type='checkbox'
            checked={g.vegetarian}
            onChange={handleChange} />
        </td>
        <td>
          <button
            disabled={this.props.ui.remove_button_disabled}
            type='button'
            onClick={handleGuestRemove}>- Guest</button>
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

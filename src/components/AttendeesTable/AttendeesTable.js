/* @flow */
// rendered by Attendees
import React from 'react'
import classes from './AttendeesTable.scss'

function handleAttendanceChange () {
  console.log('change of attendance...')
}

function handleLateChange () {
  console.log('change of late status...')
}

function handleVegChange () {
  console.log('change of veg status...')
}

function handleGuestAdd () {
  console.log('add a guest...')
}

// Schema
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { MealResidentsSchema } from '../../redux/modules/MealResidents'

type Props = {
  residents: ResidentsSchema,
  meal_residents: MealResidentsSchema
};

export class AttendeesTable extends React.Component<void, Props, void> {
  renderResidents (): Array<React$Element> {
    return this.props.residents.map((r) => {
      let attendee = this.props.meal_residents.find((mr) => mr.resident_id === r.id)

      return (
        <tr key={r.id}>
          <td>{r.unit}</td>
          <td>
            <input type='checkbox' defaultChecked={attendee}
              onChange={handleAttendanceChange} />
          </td>
          <td>{r.name}</td>
          <td>
            <label>
              <input type='checkbox'
                defaultChecked={attendee ? attendee.late : ''}
                onChange={handleLateChange} />{' '}Late
            </label>
          </td>
          <td>
            <label>
              <input type='checkbox'
                defaultChecked={attendee ? attendee.vegetarian : ''}
                onChange={handleVegChange} />{' '}Veg
            </label>
          </td>
          <td>
            <button type='button' onClick={handleGuestAdd}>+ Guest</button>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
      <table className={classes['residents-table']}>
        <tbody>
          {this.renderResidents()}
        </tbody>
      </table>
    )
  }
}

export default AttendeesTable


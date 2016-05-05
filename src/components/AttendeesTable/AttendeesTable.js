/* @flow */
// rendered by Attendees
import React from 'react'
import classes from './AttendeesTable.scss'

// Schema
import type { ResidentsSchema } from '../../redux/modules/Residents'
import type { MealResidentsSchema } from '../../redux/modules/MealResidents'

type Props = {
  ui: {
    checked_checkbox_disabled: boolean,
    unchecked_checkbox_disabled: boolean,
    veg_checkbox_disabled: boolean,
    late_checkbox_disabled: boolean,
    add_guest_button_disabled: boolean
  },
  actions: {
    addMealResident: Function,
    removeMealResident: Function,
    toggleVeg: Function,
    toggleLate: Function,
    openGuestModal: Function
  },
  residents: ResidentsSchema,
  mealResidents: MealResidentsSchema
};

export class AttendeesTable extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleAttendanceClick = this.handleAttendanceClick.bind(this)
    this.handleLateChange = this.handleLateChange.bind(this)
    this.handleVegChange = this.handleVegChange.bind(this)
    this.handleOpenGuestModal = this.handleOpenGuestModal.bind(this)
    this.getVegDisabled = this.getVegDisabled.bind(this)
  }

  handleAttendanceClick (e) {
    const mealResidentIds = this.props.mealResidents.map((mealResident) => mealResident.resident_id)
    const id = Number(e.target.value)

    if (mealResidentIds.includes(id)) {
      this.props.actions.removeMealResident({resident_id: id})
    } else {
      const isVegetarian = this.props.residents.find((resident) => resident.id === id).vegetarian

      this.props.actions.addMealResident({
        resident_id: id,
        vegetarian: isVegetarian
      })
    }
  }

  handleLateChange (e) {
    const id = Number(e.target.value)
    this.props.actions.toggleLate({resident_id: id})
  }

  handleVegChange (e) {
    const id = Number(e.target.value)
    this.props.actions.toggleVeg({resident_id: id})
  }

  handleOpenGuestModal (e) {
    let id = Number(e.target.value)

    this.props.actions.openGuestModal({
      open: true,
      host: this.props.residents.find((resident) => resident.id === id).name,
      resident_id: id
    })
  }

  getVegDisabled (attendee) {
    return this.props.ui.veg_checkbox_disabled || !attendee
  }

  renderResidents (): Array<React$Element> {
    return this.props.residents.map((r) => {
      let attendee = this.props.mealResidents.find((mr) => mr.resident_id === r.id)
      let isVegetarian = attendee ? attendee.vegetarian : r.vegetarian

      return (
        <tr key={r.id}>
          <td>{r.unit}</td>
          <td> {/* Attendance Checkbox */}
            <input
              value={r.id}
              disabled={attendee ? this.props.ui.checked_checkbox_disabled : this.props.ui.unchecked_checkbox_disabled}
              type='checkbox'
              checked={attendee}
              onChange={this.handleAttendanceClick} />
          </td>
          <td>{r.name}</td>
          <td> {/* Late Checkbox */}
            <label>
              <input
                value={r.id}
                disabled={attendee ? this.props.ui.late_checkbox_disabled : true}
                type='checkbox'
                checked={attendee ? attendee.late : false}
                onChange={this.handleLateChange} />{' '}Late
            </label>
          </td>
          <td> {/* Veg Checkbox */}
            <label>
              <input
                value={r.id}
                disabled={this.getVegDisabled(attendee)}
                type='checkbox'
                checked={isVegetarian}
                onChange={this.handleVegChange} />{' '}Veg
            </label>
          </td>
          <td> {/* Add Guest Button */}
            <button
              value={r.id}
              disabled={this.props.ui.add_guest_button_disabled}
              type='button'
              onClick={this.handleOpenGuestModal}>+ Guest</button>
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


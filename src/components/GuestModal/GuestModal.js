// rendered by MealView
import React from 'react'
import Modal from 'react-modal'

type Props = {
  data: {
    open: boolean,
    host: string,
    resident_id: number,
    multiplier: number,
    vegetarian: boolean
  },
  actions: {
    close: Function,
    toggleVeg: Function,
    toggleMultiplier: Function,
    addGuest: Function
  }
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export class GuestModal extends React.Component<void, Props, void> {
  constructor () {
    super()
    this.handleAddGuestClick = this.handleAddGuestClick.bind(this)
  }

  handleAddGuestClick (e) {
    this.props.actions.addGuest({
      resident_id: this.props.data.resident_id,
      multiplier: this.props.data.multiplier,
      vegetarian: this.props.data.vegetarian
    })

    this.props.actions.close()
  }

  render () {
    return (
      <Modal
        isOpen={this.props.data.open}
        onRequestClose={this.props.actions.close}
        style={customStyles} >

        <h2>{this.props.data.host}'s Guest</h2>
        <form>
          <input
            type='radio'
            checked={this.props.data.multiplier === 2}
            onChange={this.props.actions.toggleMultiplier}
            name='multiplier'
            value='2' />{' '}Adult{' '}
          <input
            type='radio'
            checked={this.props.data.multiplier === 1}
            onChange={this.props.actions.toggleMultiplier}
            name='multiplier'
            value='1' />{' '}Child{' '}
          <p>{' '}</p>
          <section>
            <input
              type='checkbox'
              checked={this.props.data.vegetarian}
              onChange={this.props.actions.toggleVeg} />{' '}Veg
          </section>
          <p>{' '}</p>
          <button
            type='button'
            onClick={this.props.actions.close}>cancel</button>{' '}
          <button
            type='button'
            onClick={this.handleAddGuestClick}>submit
          </button>
        </form>
      </Modal>
    )
  }
}

export default GuestModal

import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
require('react-big-calendar/lib/css/react-big-calendar.css')
import { Link } from 'react-router'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
)

function Event ({ event }) {
  return (
    <Link to={event.url}>
      <div style={{'fontSize': '0.75em'}}>{event.header}</div>
      <div style={{'fontSize': '0.75em'}}>{event.body}</div>
    </Link>
  )
}

class CalendarView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:3001/api/meals')
    .then((response) => response.json())
    .then((json) => {
      const meals = json.map((event) => Object.assign({}, {
        title: event.title,
        header: event.header,
        body: event.body,
        allDay: false,
        start: new Date(event.start),
        end: new Date(event.end),
        url: event.url
      }))
      this.setState({events: this.state.events.concat(meals)})
    })
    .catch(() => {
      console.error('Failed to load meals!')
    })

    fetch('http://localhost:3001/api/bills')
    .then((response) => response.json())
    .then((json) => {
      const bills = json.map((event) => Object.assign({}, {
        title: event.title,
        header: event.header,
        body: event.body,
        allDay: false,
        start: new Date(event.start),
        end: new Date(event.end),
        url: event.url
      }))
      this.setState({events: this.state.events.concat(bills)})
    })
    .catch(() => {
      console.error('Failed to load meals!')
    })
  }

  render () {
    return (
      <BigCalendar
        style={{height: '1200px'}}
        views={['month']}
        events={this.state.events}
        defaultDate={new Date()}
        components={{event: Event}}
      />
    )
  }
}

export default CalendarView

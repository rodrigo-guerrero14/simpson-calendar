import React from 'react'
import ReactDOM from 'react-dom'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import format from 'date-fns/format'
import startOfDay from 'date-fns/start_of_day'
import styled from '@emotion/styled'

import FullCalendar from './FullCalendar'
import Event, {eventNewDiv} from './Event'
import Simpson, {SimpsonPortal} from './Simpson'

import resources from './data/resources'
import events from './data/events'

import '@fullcalendar/core/main.css'
import '@fullcalendar/timeline/main.css'
import '@fullcalendar/resource-timeline/main.css'

const Schedule = ({date = new Date('2019-03-31T08:00:00Z')}) => {
  const ref = React.createRef()
  const routerContext = {} // useRouter()
  const apolloContext = {} // useApollo()

  const goToNextDay = () => {
    let calendarApi = ref.current.getApi()
    calendarApi.next()
    console.log(calendarApi.state.dateProfile.currentRange.end)
  }

  const goToPreviousDay = () => {
    let calendarApi = ref.current.getApi()
    calendarApi.prev()
    console.log(calendarApi.state.dateProfile.currentRange.end)
  }

  function handleEventRemoved({el}) {
    ReactDOM.unmountComponentAtNode(el)
  }

  return (
    <StyledFullCalendar>
      <FullCalendar
        ref={ref}
        schedulerLicenseKey={'GPL-My-Project-Is-Open-Source'}
        defaultDate={format(startOfDay(date))}
        defaultView="resourceTimeline"
        plugins={[resourceTimelinePlugin]}
        height={'auto'} // sets height to height of resources.
        slotWidth={60}
        minTime={'06:00'} // start timeline at this time, must be in format '08:00'
        maxTime={'11:00'} // end timeline at this time, must be in format '18:00'
        slotDuration={'00:15:00'}
        header={{
          left: 'title',
          right: 'prev, next',
        }}
        views={{
          resourceTimelineDay: {
            titleFormat: {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            },
          },
        }}
        customButtons={{
          prev: {click: () => goToPreviousDay()},
          next: {click: () => goToNextDay()},
        }}
        resourceLabelText={'The Simpsons'}
        resourceAreaWidth={'20%'}
        resources={resources}
        resourceRender={Simpson}
        events={events}
        eventRender={eventNewDiv}
        eventDestroy={handleEventRemoved}
        contextValues={{routerContext, apolloContext}}
      />

      <section>
        <h3>Read Me</h3>
        <span>1. Data only exists on March 30th and 31st</span>
        <span>
          2. Example: Previous and Next Buttons trigger functions that call the
          calender API.
        </span>
        <span>
          3. Lots of style resetting and setting is done in the
          StyledFullCalendar component
        </span>

        <h3>Problems</h3>
        <span>1. Event component renders outside of the React App.</span>
        <span>
          2. It requires ReactDOM.render() to display the event, which is gross.
        </span>
        <span>
          3. Multiple components are rendered and never destroyed when you click
          between dates (Take a look at React Debugger)
        </span>
        <span>4. Heights and Widths have to be explicitly set</span>
      </section>
    </StyledFullCalendar>
  )
}

export default Schedule

export const StyledFullCalendar = styled('div')`
  font-family: 'Quicksand', sans-serif;
  /* Aligns resource area (Associate) to center instead of the default of top. */
  .fc-resource-area {
    td.fc-widget-content {
      vertical-align: middle;
    }
  }

  /* Sets height for timeline row that holds events */
  td.fc-widget-content {
    height: 60px;

    .fc-event-container {
      /* Event container size reset */
      padding: 0;
      top: 0;
    }

    .fc-timeline-event {
      /* Event size reset */
      padding: 0;
      margin: 0;
      border: 0;
      background-color: transparent;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: 20px;

    span {
      padding: 4px 0;
    }
  }
`

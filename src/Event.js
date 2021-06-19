import React, {useEffect, useRef} from 'react'
import ReactDOM, {createPortal, render} from 'react-dom'
import styled from '@emotion/styled'

// This is only a wrapper so the component reads nicer in React Debugger. It is completely unnecessary.
export const EventDetail = ({...props}) => (
  <StyledEvent>{props.children}</StyledEvent>
)

export const EventContent = ({event}) => {
  // extendedProps is used to access additional event properties.
  return (
    <EventDetail>
      <h3>{event.title}</h3>
      <div>{event.extendedProps.description}</div>
    </EventDetail>
  )
}

const Event = ({event, el}) => {
  // This Event is wrapped in the default `el` which is a <a href=""/>
  // This cannot be used with React Router Link which uses it's own <a href=""/>
  ReactDOM.render(<EventContent event={event} />, el)
  return el
}

/*
There is a major necessity to be able to render a React component within the React <App/>.
*/
export const eventNewDiv = ({event, el, view}) => {
  console.log(view.calendar.getOption('contextValues'))
  // Creating `div` to replace the default <a href=""/> for event
  const eventDiv = document.createElement('div')
  // Get classes on the default `a.fc-timeline-event`
  const classes = Array.from(el.classList)
  // Add classes to the new `div`
  eventDiv.classList.add(...classes)

  ReactDOM.render(<EventContent event={event} />, eventDiv)

  return eventDiv
}

// This method is not going to work for our needs.
// export const EventWithStyles = ({ event, el }) => {
//   // Creating `div` to replace `a` tag for event
//   const eventDiv = document.createElement("div");
//   // Give the `div` an ID. This is not required.
//   eventDiv.setAttribute("id", event.extendedProps.index);
//   // Get classes on the default `a.fc-timeline-event`
//   const classes = Array.from(el.classList);
//   // Add classes to the new `div`
//   eventDiv.classList.add(...classes);

//   // Adding styling via HTML and not rendering React components.
//   const eventH3 = document.createElement("h3");
//   eventH3.textContent = event.title;
//   eventH3.setAttribute("style", "padding: 0; margin: 0");

//   const eventDesc = document.createElement("div");
//   eventDesc.textContent = event.extendedProps.description;

//   eventDiv.appendChild(eventH3);
//   eventDiv.appendChild(eventDesc);

//   eventDiv.setAttribute(
//     "style",
//     "min-height: 44px; min-width: 106px; padding: 4px 6px 4px; margin-top: 1px; margin-left: 1px;z-index: 2;outline: 1px solid hsla(215, 89%, 14%, 1);color: hsla(215, 89%, 14%, 1);background-color: hsla(215, 89%, 98%, 1);"
//   );

//   return eventDiv;
// };

export default Event

const StyledBaseEvent = styled('div')`
  min-height: 44px;
  min-width: 106px;
  padding: 4px 6px 4px;
  margin-top: 1px;
  margin-left: 1px;
`

const StyledEvent = styled(StyledBaseEvent)`
  position: relative;
  z-index: 2;
  outline: 1px solid hsla(215, 89%, 14%, 1);
  color: hsla(215, 89%, 14%, 1);
  background-color: hsla(215, 89%, 98%, 1);

  h3 {
    padding: 0;
    margin: 0;
  }
`

import React from 'react'
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import {Calendar} from '@fullcalendar/core'

const FullCalendar = forwardRef((props, componentRef) => {
  const elRef = useRef()
  const calRef = useRef()

  const init = () => {
    const cal = new Calendar(elRef.current, props)
    cal.setOption('contextValues', props.contextValues)
    calRef.current = cal
    cal.render()

    // Cleanup callback automatically called before un-mounting
    return () => cal.destroy()
  }

  const getApi = () => calRef.current

  // Calendar initialization
  useEffect(init, [])

  // Calendar options update when props change
  useEffect(() => {
    // TODO: deep equality check of props
    calRef.current.resetOptions(props)
    calRef.current.setOption('contextValues', {routerContext: {}})
  })

  // Allow Calendar API to be exposed to parent component when using ref
  useImperativeHandle(componentRef, () => ({getApi}), [])

  return <div ref={elRef} />
})

export default FullCalendar

"use client"
import dayjs from "dayjs"
import { useEffect, useState, Fragment, useMemo } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import WeekdaysView from "./WeekDaysView"
import PropTypes from "prop-types"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

/**
 * Event {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  resource?: any,
}

new Date(YYYY, MM-1, DD, HH, MM, SS, SSS),
 */
const events = [
  {
    id: 1,
    title: "Long Event",
    start: new Date(2024, 11, 4, 10, 30, 0, 0),
    end: new Date(2024, 11, 4, 11, 30, 0, 0),
  },
  {
    id: 2,
    title: "Long Event",
    start: new Date(2024, 11, 5, 13, 30, 0, 0),
    end: new Date(2024, 11, 5, 14, 30, 0, 0),
  },
  {
    id: 3,
    title: "Long Event",
    start: new Date(2024, 11, 5, 15, 30, 0, 0),
    end: new Date(2024, 11, 5, 16, 30, 0, 0),
  },
  {
    id: 4,
    title: "Long Event",
    start: new Date(2024, 11, 5, 17, 30, 0, 0),
    end: new Date(2024, 11, 5, 18, 30, 0, 0),
  },
  {
    id: 5,
    title: "Long Event",
    start: new Date(2024, 11, 5, 19, 30, 0, 0),
    end: new Date(2024, 11, 5, 20, 30, 0, 0),
  },
]

export function MyCalendar({}) {
  const defaultDate = useMemo(() => new Date(), [])
  const onSelectSlot = ({ action, slots /*, ...props */ }) => {
    console.log("onSelectSlot")
    if (action === "click") {
      console.log("click", slots)
      alert("click")
    }
    return false
  }
  return (
    <Fragment>
      <div className="">
        <Calendar
          defaultDate={defaultDate}
          events={events}
          style={{ height: 600 }}
          localizer={localizer}
          selectable={true}
          popup
          onSelectSlot={onSelectSlot}
        />
      </div>
    </Fragment>
  )
}
MyCalendar.propTypes = {
  localizer: PropTypes.instanceOf(localizer),
}

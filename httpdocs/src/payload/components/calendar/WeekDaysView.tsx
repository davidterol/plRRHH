import { useMemo } from "react"
import { Navigate } from "react-big-calendar"
import PropTypes from "prop-types"
import Month from "react-big-calendar/lib/Month"

export function WeekdaysView({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}) {
  const currRange = useMemo(
    () => new Date(),
    [date, localizer]
  )

  return (
    <Month
      date={date}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}

WeekdaysView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

WeekdaysView.title = (date, { localizer }) => {
  return `My awesome week: ${Date.toLocaleString()}`
}

"use client"
import { Fragment, useMemo, useCallback } from "react"
import { Collapsible } from "@payloadcms/ui"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { es } from "date-fns/locale/es"
import { format, parse, startOfWeek, getDay } from "date-fns"
import PropTypes from "prop-types"

const locales = {
  es: es,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => {
    return startOfWeek(new Date(), { weekStartsOn: 1 })
  },
  getDay,
  locales,
})

export function MyCalendar({ events, counterl, countera, totalDays }) {
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(event.title.includes("Libre") && {
        style: { backgroundColor: "#FFBEBC", color: "#000000" },
      }),
      ...(event.title.includes("Navidad") && {
        style: { backgroundColor: "#B6CFB6", color: "#000000" },
      }),
      ...(event.title.includes("Verano") && {
        style: { backgroundColor: "#B6CFB6", color: "#000000" },
      }),
      ...(event.title.includes("Asuntos") && {
        style: { backgroundColor: "#ACE7FF", color: "#000000" },
      }),
    }),
    []
  )

  const defaultDate = useMemo(() => new Date(), [])
  const onSelectSlot = ({ action, slots }) => {
    console.log("onSelectSlot")
    if (action === "click") {
      console.log("click", slots)
      // alert("click")
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
          views={{ month: true }}
          defaultView="month"
          culture="es"
          selectable={true}
          eventPropGetter={eventPropGetter}
          onSelectSlot={onSelectSlot}
        />
      </div>
      <Collapsible
        header="Días Gastados"
        className="collapsible days-gastados"
        collapsibleStyle="default"
        initCollapsed={true}
      >
        <div className="collapsible__content">
          <div className="collapsible__content__item">
            <p>
              Libre Disposición: {counterl} de {totalDays[0]}{" "}
              disponibles
            </p>
            <p>
              Asuntos Propios: {countera} de {totalDays[1]}{" "}
              disponibles
            </p>
          </div>
        </div>

        {/* <div className="collapsible__content">
          <div className="collapsible__content__item">
            <p>Hola</p>
          </div>
        </div> */}
      </Collapsible>
    </Fragment>
  )
}
MyCalendar.propTypes = {
  localizer: PropTypes.instanceOf(localizer),
}

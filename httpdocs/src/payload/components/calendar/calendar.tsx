"use client"
import { Fragment, useMemo, useCallback, useState } from "react"
import {
  Collapsible,
  Modal,
  useModal,
  Button,
  useConfig,
  DatePicker,
  Select,
} from "@payloadcms/ui"
import { MinimalTemplate } from "@payloadcms/next/templates"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { es } from "date-fns/locale/es"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { ClientCollectionConfig } from "payload"

// LOCALE
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

// FUNCTIONS TO CREATE REQUESTS
export async function createRequest(event, type, user) {
  var status = "pending"
  if (user?.employee?.valueOf().position == "Director/a General" || user.roles?.includes("admin")) {
    status = "approve"
  }
  try {
    const req = await fetch("../api/requests/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        dateChoose: event,
        user: user.id,
        status: status,
        department: user?.employee?.valueOf().department,
        titulo:
          user?.employee?.valueOf().name +
          " " +
          user?.employee?.valueOf().apellidos +
          " -- " +
          [
            type == "libre_disposición"
              ? "Libre Disposición"
              : "Asuntos Propios",
          ] +
          " el día " +
          format(new Date(event), "dd/MM/yyyy"),
      }),
    })
    const data = await req.json()
    return data && location.reload()
  } catch (err) {
    console.log(err)
  }
}

/// CALENDAR
export function MyCalendar({ events, counterl, countera, totalDays, user }) {
  const { getEntityConfig } = useConfig()

  // GET REQUESTS COLLECTION CONFIG
  const collectionConfig = getEntityConfig({
    collectionSlug: "requests",
  }) as ClientCollectionConfig

  // GET REQUESTS COLLECTION CONFIG OPTIONS
  var options = collectionConfig.fields.filter((f) => f.name === "type")[0].options
  options = options.filter((o) => {
    if (o.value == "libre_disposición") {
      if (totalDays[0] - counterl == 0) {
        return false
      }
      return true
    }
    if (o.value == "asuntos_propios") {
      if (totalDays[1] - countera == 0) {
        return false
      }
      return true
    }
  })


  // STYLE FOR EACH TYPE OF EVENT
  const eventPropGetter = useCallback(
    (event) => ({
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

  // MODAL
  const { toggleModal } = useModal()

  const modalStug = "modal-1"

  const defaultDate = useMemo(() => new Date(), [])

  const [date, onChangeDate] = useState(new Date())
  const [type, onChangetype] = useState("")

  /// CLICK ON DATE
  const onSelectSlot = (slotInfo, counterl, countera, totalDays) => {
    const { start, end, slots, action } = slotInfo

    // GET ALL EVENTS FOR THIS DAY
    const eventsForThisDay = events.filter(
      (event) =>
        (event.start >= start && event.start < end) ||
        (start >= event.start && end <= event.end)
    )

    // IF CLICK ON DATE
    if (action === "click") {
      // CONST OF DATE OF SLOT
      const date = new Date(slots)
      const year = new Date(slots).getFullYear()
      const month = new Date(slots).getUTCMonth()
      const day = new Date(slots).getDate()

      // CHANGE DATE IN SELECTDAY
      onChangeDate(new Date(year, month, day))

      // IF THERE IS A REQUEST FOR THIS DAY
      if (totalDays[0] - counterl == 0 && totalDays[1] - countera == 0) {
        alert("Dias Gastados")
        return false
      }
      if (eventsForThisDay.length > 0) {
        alert("Ya existe una solicitud para ese día")
      } else {
        if (new Date() >= date) {
          alert("Solo se puede crear una solicitud de días futuros")
        } else {
          if (date.getDay() == 6 || date.getDay() == 0) {
            alert("Solo se puede crear una solicitud en día laborable")
          }
          if (
            date.getDay() == 1 ||
            date.getDay() == 2 ||
            date.getDay() == 3 ||
            date.getDay() == 4 ||
            date.getDay() == 5
          ) {
            toggleModal(modalStug)
          }
        }
      }
      return false
    }
  }

  /// CALENDAR AND MODAL
  return (
    <Fragment>
      <div className="calendar">
        {/* <Button onClick={() => toggleModal(modalStug)}>Open Modal</Button> */}
        <Modal
          slug={modalStug}
          className="drawer__content-children modal-bg-blur"
        >
          <MinimalTemplate className="drawer__content-children">
            <label className="field-label">Type</label>
            <Select options={options} onChange={(e) => onChangetype(e.value)} />
            <label className="field-label" style={{ marginTop: "20px" }}>
              Día elegido
            </label>
            <DatePicker
              value={date}
              onChange={(date) => onChangeDate(date)}
              displayFormat="dd/MM/yyyy"
            />

            <Button
              buttonStyle="primary"
              onClick={() => createRequest(date, type, user)}
            >
              Create
            </Button>
            <Button
              buttonStyle="secondary"
              onClick={() => toggleModal(modalStug)}
            >
              Close
            </Button>
          </MinimalTemplate>
        </Modal>
        <Calendar
          defaultDate={defaultDate}
          events={events}
          style={{ height: 600 }}
          localizer={localizer}
          views={{ month: true }}
          defaultView="month"
          culture="es"
          selectable
          eventPropGetter={eventPropGetter}
          onSelectSlot={(slotInfo) =>
            onSelectSlot(slotInfo, counterl, countera, totalDays)
          }
          // onSelectEvent={(e) => handleSelectedEvent(e)}
        />
      </div>
      <Collapsible
        header={"Días Gastados ("+(counterl+countera)+")"}
        className="collapsible days-gastados"
        collapsibleStyle="default"
        initCollapsed={true}
      >
        <div className="collapsible__content">
          <div className="collapsible__content__item">
            <p>
              Libre Disposición: {counterl} / {totalDays[0]}
            </p>
            <p>
              Asuntos Propios: {countera} / {totalDays[1]} 
            </p>
          </div>
        </div>
      </Collapsible>
    </Fragment>
  )
}

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
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isFirstDayOfMonth,
  getDate,
} from "date-fns"
import PropTypes from "prop-types"
import { ClientCollectionConfig } from "payload"
import { on } from "events"

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

const createRequest = async (event: Date, type: string, user: Object) => {
  console.log("CREAATE")
  console.log(user)
  console.log(type)
  console.log(event)

  // try {
  //   const req = await fetch("../api/requests/", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       type: type,
  //       dateChoose: event,
  //       user: user.id,
  //       department: user.employee.valueOf().department,
  //       titulo: "Libre Disposición TEST",
  //     }),
  //   })
  //   console.log(await req.json())
  // } catch (err) {
  //   console.log(err)
  // }
}
export function MyCalendar({ events, counterl, countera, totalDays, user }) {
  const { getEntityConfig } = useConfig()

  const collectionConfig = getEntityConfig({
    collectionSlug: "requests",
  }) as ClientCollectionConfig

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

  

  
  /// CLICK ON DATE
  const onSelectSlot = ({ action, slots }) => {
    if (action === "click") {
      const year = new Date(slots).getFullYear
      const month = new Date(slots).getUTCMonth()
      const day = new Date(slots).getDate

      console.log(month)
      toggleModal(modalStug)
      return false
    }
  }
  const [date, onChangeDate] = useState(new Date())
  const [type, onChangetype] = useState("")

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
            <Select
              options={
                collectionConfig.fields.filter((f) => f.name === "type")[0]
                  .options
              }
              onChange={(e) => onChangetype(e.value)}
            />
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
          // allDayMaxRows={1}
          selectable={true}
          eventPropGetter={eventPropGetter}
          onSelectSlot={onSelectSlot}
          // onSelectEvent={(e) => handleSelectedEvent(e)}
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
              Libre Disposición: {counterl} de {totalDays[0]} disponibles
            </p>
            <p>
              Asuntos Propios: {countera} de {totalDays[1]} disponibles
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

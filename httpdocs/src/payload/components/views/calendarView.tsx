import type { AdminViewProps } from "payload"
import { DefaultTemplate } from "@payloadcms/next/templates"
import { Button, HydrateAuthProvider, CalendarIcon } from "@payloadcms/ui"
import { redirect } from "next/navigation"
import { MyCalendar } from "../calendar/calendar"
import { useMemo } from "react"
import { Event } from "react-big-calendar"

const calendarView: React.FC<AdminViewProps> = async (props) => {
  const { initPageResult, searchParams, params } = props
  const { req, visibleEntities, permissions } = initPageResult
  const { i18n, payload, user } = req
  var events: [Event] = []

  var counterl = 0
  var countera = 0
  const requests = await payload.find({
    collection: "requests",
    where: {
      user: {
        equals: user?.id,
      },
      status: {
        equals: "approve",
      },
    },
  })

  const vacations = await payload.findGlobal({
    slug: "Config",
    depth: 2,
  })
  const config = vacations.vacationConfig

  const freeDays = vacations.freeDays
  const freeAP = vacations.freeAP
  const totalDays = [freeDays, freeAP]

  config?.period?.forEach((el) => {
    const start = new Date(el.startDate?.toString())
    const end = new Date(el.endDate?.toString())

    const e: Event = {
      title: el["Nombre Periodo"],
      start: start,
      end: end,
    }
    events.push(e)
  })

  requests.docs.forEach((e) => {
    const date = new Date(e.dateChoose?.toString())
    // const year = date.getFullYear()
    // const month = date.getMonth()
    // const day = date.getDate()
    var title = ""

    if (e.type?.includes("libre")) {
      title = "Libre disposición"
      counterl ++
    }
    if (e.type?.includes("asuntos")) {
      title = "Asuntos Propios"
      countera ++
    }

    const event: Event = {
      title: title,
      start: date,
      end: date,
      allDay: true,
    }
    // console.log(event)
    events.push(event)
  })

  if (!user || (user && !permissions?.canAccessAdmin)) {
    return redirect(`${payload.config.routes.admin}/unauthorized`)
  }

  return (
    <>
      {/* <HydrateAuthProvider permissions={permissions} /> */}
      <DefaultTemplate
        payload={payload}
        i18n={i18n}
        visibleEntities={visibleEntities}
        locale={initPageResult.locale}
        permissions={initPageResult.permissions}
        user={user}
        searchParams={searchParams}
      >
        <div className="gutter--left gutter--right">
          <h1>Calendar</h1>
          <MyCalendar events={events} counterl={counterl} countera={countera} totalDays={totalDays}></MyCalendar>
        </div>
      </DefaultTemplate>
    </>
  )
}

export default calendarView
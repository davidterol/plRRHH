import type { AdminViewProps } from "payload"
import { DefaultTemplate } from "@payloadcms/next/templates"
import { Button, HydrateAuthProvider, CalendarIcon } from "@payloadcms/ui"
import { redirect } from "next/navigation"
import { MyCalendar } from "../calendar/calendar"
import { useMemo } from "react"



const calendarView: React.FC<AdminViewProps> = async (props) => {
  const { initPageResult, searchParams, params } = props
  const { req, visibleEntities, permissions } = initPageResult
  const { i18n, payload, user } = req

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
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
          <MyCalendar></MyCalendar>
        </div>
      </DefaultTemplate>
    </>
  )
}

export default calendarView

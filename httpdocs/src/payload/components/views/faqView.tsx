import { DefaultTemplate } from "@payloadcms/next/templates"
import { AdminViewProps } from "payload"
import React from 'react'
import FAQ from "../faqs"


const baseClass = "faqs"




const faqView: React.FC<AdminViewProps> = async (props) => {
  const { initPageResult, searchParams, params } = props
  const { req, visibleEntities, permissions } = initPageResult
  const { i18n, payload, user } = req

  const content = await payload.find({
    collection: "faqs",
  })
  // content.docs as IQuestion[] con const faqs
  const faqs = content.docs
  
  return (
    <DefaultTemplate
      payload={payload}
      i18n={i18n}
      visibleEntities={visibleEntities}
      locale={initPageResult.locale}
      permissions={initPageResult.permissions}
      user={user}
      searchParams={searchParams}
    >
      <div className="aaa">
      </div>
      <div className={baseClass}>
        <FAQ faqs={faqs} />
      </div>
    </DefaultTemplate>
  )
}

export default faqView

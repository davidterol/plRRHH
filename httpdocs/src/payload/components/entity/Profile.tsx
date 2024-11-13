"use client"
import type { SelectFieldClientComponent } from "payload"

import { SelectField, useField } from "@payloadcms/ui"
import { useMemo } from "react"

const Profile: SelectFieldClientComponent = ({ field }) => {
  const { value: typeValue } = useField({ path: "type" })

  field.options = useMemo(() => {
    return typeValue === "entidad"
      ? [
          {
            label: "ASOCIACIÓN EMPRESARIAL",
            value: "asociacionEmpresarial",
          },
          {
            label: "CÁTEDRA",
            value: "catedra",
          },
        ]
      : [
          {
            label: "STARTUP",
            value: "startup",
          },
          {
            label: "PYME",
            value: "pyme",
          },
          {
            label: "AUTÓNOMO",
            value: "autonomo",
          },
        ]
  }, [typeValue])

  return <SelectField field={field} />
}

export default Profile

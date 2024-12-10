import type { GlobalConfig } from "payload"
import { rrhh } from "../access/rrhh"

export const Config: GlobalConfig = {
  slug: "Config",
  access: {
    read: rrhh,
    update: rrhh,
  },
  admin: {
    group: "CONFIG",
    // defaultColumns: ["titulo", "dateChoose", "status", "department"],
    // listSearchableFields: ["titulo"],
    // baseListFilter: (args) => ({
    //     titulos:
    // })
  },
  fields: [
    {
      name: "vacationConfig",
      type: "group",
      label: "Configuración Vacaciones",
      fields: [
        {
          name: "period",
          type: "array",
          labels: {
            singular: "Periodo",
            plural: "Periodos",
          },
          label: "Periodos",
          maxRows: 3,
          fields: [
            { name: "Nombre Periodo", type: "text", label: "Nombre Periodo" },
            {
              name: "startDate",
              type: "date",
              label: "Fecha Comienzo",
            },
            { name: "endDate", type: "date", label: "Fecha Fin" },
          ],
        },
      ],
    },
    {
      name: "freeDays",
      label: "Días de Libre Disposición",
      type: "number",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "freeAP",
      label: "Días de Asuntos Propios",
      type: "number",
      admin: {
        position: "sidebar",
      },
    },
  ],
}

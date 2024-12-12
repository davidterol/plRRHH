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
      name: "vacationConfigCDI",
      type: "group",
      label: "Configuración Vacaciones CDI",
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
            {
              name: "Nombre Periodo",
              type: "select",
              label: "Nombre Periodo",
              options: ["Verano", "Navidad"],
              required: true,
            },
            {
              name: "startDate",
              type: "date",
              label: "Fecha Comienzo",
              required: true,
              admin: {
                date: {
                  overrides: {
                    displayFormat: "dd/MM/yyyy",
                    calendarStartDay: 1,
                  },
                },
              },
            },
            {
              name: "endDate",
              type: "date",
              label: "Fecha Fin",
              required: true,
              admin: {
                date: {
                  displayFormat: "dd/MM/yyyy",
                  overrides: {
                    calendarStartDay: 1,
                  },
                },
              },
            },
          ],
        },
        {
          name: "freeDays",
          label: "Días de Libre Disposición",
          type: "number",
          required: true,
        },
        {
          name: "freeAP",
          label: "Días de Asuntos Propios",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "vacationConfigP",
      type: "group",
      label: "Configuración Vacaciones Parque",
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
            {
              name: "Nombre Periodo",
              type: "select",
              label: "Nombre Periodo",
              options: ["Verano", "Navidad"],
              required: true,
            },
            {
              name: "startDate",
              type: "date",
              label: "Fecha Comienzo",
              required: true,
              admin: {
                date: {
                  displayFormat: "dd/MM/yyyy",
                  overrides: {
                    calendarStartDay: 1,
                  },
                },
              },
            },
            {
              name: "endDate",
              type: "date",
              label: "Fecha Fin",
              required: true,
              admin: {
                date: {
                  displayFormat: "dd/MM/yyyy",
                  overrides: {
                    calendarStartDay: 1,
                  },
                },
              },
            },
          ],
        },
        {
          name: "freeDays",
          label: "Días de Libre Disposición",
          type: "number",
          required: true,
        },
        {
          name: "freeAP",
          label: "Días de Asuntos Propios",
          type: "number",
          required: true,
        },
      ],
    },
  ],
}

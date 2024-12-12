import type { CollectionConfig } from "payload"
import { adminOrRrhhOrSelf } from "../access/adminOrRrhhOrSelf"
import { format, compareAsc, startOfWeek } from "date-fns"
import { rrhh } from "../access/rrhh"
import { managers } from "../access/managers"
import { checkRole } from "../access/utils/checkRoles"
import { department } from "../reusable"
import { access } from "fs"
// import setAuthor from './hooks/setAuthor.ts'


export const Requests: CollectionConfig = {
  slug: "requests",
  access: {
    read: managers,
    create: async ({ req }) => {
      const { user, payload } = req
       const vacations = await payload.findGlobal({
          slug: "Config",
        })
        const requests = await payload.find({
          collection: "requests",
        })
        const daysExpendedL = requests.docs.filter((request) => request.status == "approve" && request.type == "libre_disposición")
        const daysExpendedA = requests.docs.filter((request) => request.status == "approve" && request.type == "asuntos_propios")
        const configPar = vacations.vacationConfigP
        const configCDI = vacations.vacationConfigCDI
        const config =
          user?.employee?.valueOf().department == "Centro de Idiomas"
            ? configCDI
            : configPar
        const freeDays = config?.freeDays
        const freeAP = config?.freeAP


        if (freeDays - daysExpendedL.length == 0 && freeAP - daysExpendedA.length == 0) {
          return false
        }
      if (checkRole(["admin"], user)) {
        return true
      }
      if (checkRole(["rrhh"], user)) {
        return true
      }
      return (
         {
          user: {
            equals: user?.id,
          },
        }
      )
    },
    update: ({ req }) => {
      const { user } = req
      if (user?.roles?.includes("rrhh") || user?.roles?.includes("admin")) {
        return true
      }
      if (user?.employee?.valueOf().position == "Director/a de Área") {
        return {
          user: {
            not_equals: user.id,
          },
          and: [
            {
              department: {
                equals: user.employee?.valueOf().department,
              },
            },
          ],
        }
      }
      if (user?.employee?.valueOf().position == "Director/a General") {
        return true
      }
      return false
    },
    delete: rrhh,
  },
  // auth: {
  //   useAPIKey: true,
  //   // loginWithUsername: {
  //   //   allowEmailLogin: true,
  //   // }
  // },
  admin: {
    group: "MENU USUARIO",
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "dateChoose", "status", "department"],
    listSearchableFields: ["titulo"],
    hidden: (args) => {
      return !args.user?.roles?.includes("admin")
    },
    // baseListFilter: (args) => ({
    //     titulos:
    // })
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Asuntos Propios",
          value: "asuntos_propios",
        },
        {
          label: "Libre Disposición",
          value: "libre_disposición",

        },
      ],
      access: {
        update: ({ req }) => {
          const { user } = req
          if (user?.roles?.includes("rrhh") || user?.roles?.includes("admin")) {
            return true
          }
          return false
        },
      },
    },
    {
      name: "titulo",
      type: "text",
    },
    department,
    {
      name: "dateChoose",
      label: "Día elegido",
      type: "date",
      admin: {
        date: {
          displayFormat: "dd/MM/yyyy",
          pickerAppearance: "dayOnly",
          minDate: new Date(),
          maxDate: new Date(new Date().getFullYear(), 11, 31),
          overrides: {
            calendarStartDay: 1,
          },
        },
        disableListFilter: true,
      },
    },
    {
      name: "user",
      label: "Usuario",
      type: "relationship",
      admin: {
        hidden: true,
        disableListFilter: true,
      },
      relationTo: "users",
    },
    {
      name: "status",
      label: "Estado",
      type: "select",
      options: [
        {
          label: "Pendiente de Aprovación",
          value: "pending",
        },
        {
          label: "Aprobado",
          value: "approve",
        },
        {
          label: "Denegado",
          value: "denied",
        },
      ],
      defaultValue: "pending",
      access: {
        update: () => false,
        read: () => true,
      },
    },
    {
      name: "document",
      type: "upload",
      relationTo: "media",
      access: {
        read: () => true,
        create: () => true,
        update: () => false,
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req, collection }) => {
        if (req) {
          var status = "pending"
          if (req.user?.employee?.valueOf().position == "Director/a General" || req.user?.roles?.includes("admin")) {
            status = "approve"
          }
          req.payload.update({
            collection: collection.slug,
            where: {
              id: doc.id,
              user: { equals: undefined },
            },
            showHiddenFields: true,
            data: {
              user: req.user?.id,
              titulo:
                req.user?.employee?.valueOf().name +
                " " +
                req.user?.employee?.valueOf().apellidos +
                " -- " +
                [
                  doc.type == "libre_disposición"
                    ? "Libre Disposición"
                    : "Asuntos Propios",
                ] +
                " el día " +
                format(new Date(doc.dateChoose), "dd/MM/yyyy"),
              department: req.user?.employee?.valueOf().department,
              status: status,
            },
          })
        }
      },
    ],
  },
}

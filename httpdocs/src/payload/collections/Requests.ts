import type { CollectionConfig } from "payload"
import { adminOrRrhhOrSelf } from "../access/adminOrRrhhOrSelf"
import { format, compareAsc } from "date-fns"
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
    create: adminOrRrhhOrSelf,
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
  admin: {
    group: "MENU USUARIO",
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "dateChoose", "status", "department"],
    listSearchableFields: ["titulo"],
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
        create: () => false,
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
          if (req.user?.employee?.valueOf().position == "Director/a General") {
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

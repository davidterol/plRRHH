import type { CollectionConfig } from 'payload'
import { admins } from "../access/admins"
import { adminOrRrhhOrSelf } from "../access/adminOrRrhhOrSelf"
import { equal } from 'assert'
import { checkRole } from "@/payload/access/utils/checkRoles"
// import setAuthor from './hooks/setAuthor.ts'

export const Request: CollectionConfig = {
  slug: 'request',
  access: {
    read:  ({ req: { user } }) => { 
      if (checkRole(["admin"], user)) {
        return true
      }
      if (checkRole(["rrhh"], user)) {
        return true
      }
      return {
        user: {
          equals: user?.id
        }
    } },
    create: adminOrRrhhOrSelf,
    update: adminOrRrhhOrSelf,
    delete: adminOrRrhhOrSelf,
  },
  admin: {
    group: 'Empleados',
    useAsTitle:  'user',
    defaultColumns: ['type', 'dateChoose', 'user']
  },
  fields: [
    {
        name: 'type',
        type: 'select',
        options: [
            {
                label: 'Asuntos Propios',
                value: 'asuntos_propios'
            },
            {
                label: 'Libre Disposición',
                value: 'libre_disposición'
            }
        ]
    },
    {
      name: 'dateChoose',
      label: 'Día elegido',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
        }
      }
    },
    {
      name: 'user',
      label: 'Usuario',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'users',
    }
  ],
  hooks: {
    afterChange: [
      ({doc, req, collection}) => {
        req.payload.update ({
          collection: collection.slug,
          where: {
          id: doc.id,
          user: { equals: undefined }
          },
          data: {
            user: req.user?.id
          }
        })
        req.redirect("https://plrrhh.ddev.site/admin/collections/request?limit=10")
      }]
}
}

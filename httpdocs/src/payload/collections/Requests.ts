import type { CollectionConfig } from 'payload'
import { admins } from '../access/admins'
import { adminOrRrhhOrSelf } from '../access/adminOrRrhhOrSelf'
import { equal } from 'assert'
import { checkRole } from '@/payload/access/utils/checkRoles'
import { format, compareAsc } from 'date-fns'
import { slugField } from '../reusable/slug'
import { adminOrSelf } from '../access/adminOrSelf'
// import setAuthor from './hooks/setAuthor.ts'

export const Requests: CollectionConfig = {
  slug: 'requests',
  access: {
    read: ({ req: { user } }) => {
      if (checkRole(['admin'], user)) {
        return true
      }
      if (checkRole(['rrhh'], user)) {
        return true
      }
      return {
        user: {
          equals: user?.id,
        },
      }
    },
    create: adminOrRrhhOrSelf,
    update: adminOrRrhhOrSelf,
    delete: adminOrRrhhOrSelf,
  },
  admin: {
    group: 'MENU USUARIO',
    useAsTitle: 'titulo',
    defaultColumns: ['type', 'dateChoose'],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Asuntos Propios',
          value: 'asuntos_propios',
        },
        {
          label: 'Libre Disposición',
          value: 'libre_disposición',
        },
      ],
    },
    {
      name: 'titulo',
      type: 'text',
    },
    {
      name: 'dateChoose',
      label: 'Día elegido',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'user',
      label: 'Usuario',
      type: 'relationship',
      admin: {
        hidden: true,
      },
      relationTo: 'users',
    },
    {
      name: 'state',
      label: 'Estado',
      type: 'select',
      options: [
        {
          label: 'Pendiente de Aprovación',
          value: 'pending',
        },
        {
          label: 'Aprobado',
          value: 'approve'
        },
        {
          label: 'Denegado',
          value: 'denied',
        }
      ],
      defaultValue: 'pending',
      access: {
        create: () => true,
        update: admins,
        delete: admins,
      },
      hidden: true
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req, collection }) => {
        req.payload.update({
          collection: collection.slug,
          where: {
            id: doc.id,
            user: { equals: undefined },
          },
          data: {
            user: req.user?.id,
            titulo:
              doc.type == 'libre_disposición'
                ? 'Libre Disposición'
                : 'Asuntos Propios' + ' el día ' + format(new Date(doc.dateChoose), 'dd/MM/yyyy'),
          },
        })
      },
    ],
  },
}

import { admins } from '../../access/admins'
import { adminOrSelf } from '../../access/adminOrSelf'
import { adminOrRrhhOrSelf } from '../../access/adminOrRrhhOrSelf'
import { rrhh } from '../../access/rrhh'
import { city, department, category, position } from '@/payload/reusable'
import { apellidos, name } from '@/payload/reusable/users'
import type { CollectionConfig } from 'payload'


export const Employees: CollectionConfig = {
  slug: 'employees',
  labels: {
    plural: {
      es: 'Empleados',
    },
    singular: {
      es: 'Empleado',
    },
  },
  admin: {
    group: 'Empleados',
    useAsTitle: 'mail',
    defaultColumns: ['mail', 'name', 'apellidos', 'department'],
  },
  access: {
    read: adminOrRrhhOrSelf,
    create: rrhh,
    update: rrhh,
    delete: rrhh,
  },
  fields: [
    {
      label: 'Información personal',
      type: 'collapsible',
      fields: [
        {
          type: 'upload',
          name: 'photo',
          label: 'Photo',
          relationTo: 'media',
        },
        {
          type: 'row',
          fields: [
            name,
            apellidos,
            {
              name: 'mobile',
              label: 'Móvil',
              type: 'text',
            },
            {
                name: 'mail',
                label: 'Email',
                type: 'text'
            },
          ],
        },
        {
          type: 'row',
          fields: [
            city,
            {
              name: 'dateOfBirth',
              type: 'date',
              label: 'Fecha de nacimiento',
              admin: {
                date: {
                  displayFormat: 'dd/MM/yyyy',
                }
              }
            },
          ],
        },
      ],
    },
    department,
    position,
    category,
    {
        type: 'relationship',
        name: 'user',
        relationTo: 'users',
        hasMany: false,
    }
  ],
}

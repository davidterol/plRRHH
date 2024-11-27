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
    group: 'RRHH',
    useAsTitle: 'nif',
    hidden:(args) => {
      // console.log(args.user?.roles?.includes('admin'))
      return !args.user?.roles?.includes('admin') && !args.user?.roles?.includes('rrhh') ;
      },
    defaultColumns: ['name', 'apellidos', 'department'],
  },
  access: {
    read: () => true,
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
            { 
              name: 'nif',
              label: 'NIF/DNI',
              type: 'text'
            },
            name,
            apellidos,
            {
              name: 'mobile',
              label: 'Móvil',
              type: 'text',
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
    category
  ],
}

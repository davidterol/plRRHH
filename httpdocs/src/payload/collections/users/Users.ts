import { admins } from '../../access/admins'
import { adminOrSelf } from '../../access/adminOrSelf'
import { rrhh } from '../../access/rrhh'
import { checkRole } from '../../access/utils/checkRoles'
import { city, department, category, position } from '@/payload/reusable'
import { apellidos, name } from '@/payload/reusable/users'
import { gallery } from '@/payload/reusable/gallery'
import type { User } from '@/payload-types'
import type { CollectionConfig } from 'payload'

const query = {
  roles: {
    equals: 'admin'
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: {
      es: 'Usuarios',
    },
    singular: {
      es: 'Usuario',
    },
  },
  auth: {
    useAPIKey: false,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    defaultColumns: ['email', 'active'],
    listSearchableFields: ['email', 'position'],
  },
  access: {
    read: adminOrSelf,
    create: admins,
    update: adminOrSelf,
    delete: admins,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      label: 'Roles',
      admin: {
        position: 'sidebar',
        condition: data => Boolean(data?.roles)
      },
      required: true,
      hasMany: true,
      access: {
        read: () => true,
        create: ({req: { user } }) => user?.roles.includes("admin"),
        update: ({req: { user } }) => user?.roles.includes("admin"),
      },
      defaultValue: ['authenticated'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Authenticated',
          value: 'authenticated',
        },
        {
          label: 'RRHH',
          value: 'rrhh',
        },
        {
          label: 'Directores',
          value: 'managers',
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'active',
      label: 'Usuario activo',
      defaultValue: true,
      access: {
        read: () => true,
        create: ({req: { user } }) => user?.roles.includes("admin"),
        update: ({req: { user } }) => user?.roles.includes("admin")
      },
    },
  ],
}

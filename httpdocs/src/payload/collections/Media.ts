import type { CollectionConfig } from 'payload'
import { admins } from '../access/admins'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Admin'
  },
  access: {
    read: admins,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}

import type { CollectionConfig } from "payload"
import { adminOrRrhhOrSelf } from "../access/adminOrRrhhOrSelf"
import { managers } from "../access/managers"

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    plural: "Archivos",
    singular: "Archivo"
  },
  admin: {
    group: 'MENU USUARIO',
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'updatedAt'],
  },
  access: {
    read: adminOrRrhhOrSelf,
    create: ()=> true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: 'Titulo',
      required: true,
      
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        hidden: true
      }
    },
  ],
  upload: {
    mimeTypes: ['application/pdf'],
    bulkUpload: false
  },
  hooks: {
    afterChange: [
      ({ doc, req, collection }) => {
        if (req) {
          req.payload.update({
            collection: collection.slug,
            where: {
              id: doc.id,
              user: { equals: undefined },
            },
            data: {
              user: req.user?.id,
            },
          })
        }
      },
    ],
  }
}

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
    group: "MENU USUARIO",
    // defaultColumns: ["email", "active", "masquerade"],
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'updatedAt'],
  },
  access: {
    read: managers,
    update: managers,
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
    mimeTypes: ['application/pdf', 'image'],
    bulkUpload: false,
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

import type { Field } from "payload"

export const tags: Field = {
  name: "tags",
  type: "relationship",
  label: "Etiquetas",
  hasMany: true,
  relationTo: "tags",
  required: true,
}

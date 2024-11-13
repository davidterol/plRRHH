import type { Field } from "payload"
export const gallery: Field = {
  type: "upload",
  name: "gallery",
  label: "Galería de imágenes",
  relationTo: "media",
  hasMany: true,
}

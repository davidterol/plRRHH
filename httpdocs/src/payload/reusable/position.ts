import type { SelectField } from "payload"

export const position: SelectField = {
  name: "position",
  label: "Puesto",
  type: "select",
  required: false,
  options: [
   "Técnico",
   "Docente",
   "Director/a de Área",
   "Director/a Idiomas",
   "Director/a General"
  ],
}

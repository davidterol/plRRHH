import type { SelectField } from "payload"

export const department: SelectField = {
  name: "department",
  label: "Departamento",
  type: "select",
  required: false,
  options: [
   "Sistemas",
   "Aceleración Empresarial",
   "Emprendimiento",
   "Personas y Talento",
   "Comunicación",
   "Centro de Idiomas",
   "Administración",
  ],
}

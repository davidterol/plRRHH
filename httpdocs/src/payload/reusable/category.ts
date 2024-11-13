import type { SelectField } from "payload"

export const category: SelectField = {
  name: "category",
  label: "Categoría",
  type: "select",
  required: false,
  options: [
   "TG7",
   "TG6",
   "TG5",
   "TG4",
   "TG3",
   "TG2",
   "TG1",
  ],
}

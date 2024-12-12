import type { SelectField } from "payload"

export const department: SelectField = {
  name: "department",
  label: "Departamento",
  type: "select",
  required: false,
  access: {
    read: () => true,
    update: (args) => {
      if (
        args.req.user?.roles?.includes("rrhh") ||
        args.req.user?.roles?.includes("admin")
      ) {
        return true
      }
      return false
    },
  },
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

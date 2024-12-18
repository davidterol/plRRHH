import type { Field } from "payload"

export const name: Field = {
  name: "name",
  label: "Nombre",
  type: "text",
  hooks: {
    afterRead: [
      (field) => {
        const { value, field: fieldConf } = field
        // console.log({ fieldConf, value })

        // Change collection field access inside the hook
        if (value === "disabled") {
          fieldConf.access = {
            update: () => false,
          }
        }
        return value
      },
    ],
  },
}

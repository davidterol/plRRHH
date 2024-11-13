import type { Field, RowField } from "payload"

const x: Field = {
  name: "x",
  type: "text",
  required: false,
}
const facebook: Field = {
  name: "facebook",
  type: "text",
  required: false,
}
const linkedin: Field = {
  name: "linkedin",
  type: "text",
  required: false,
}
const instagram: Field = {
  name: "instagram",
  type: "text",
  required: false,
}

export const rrss: RowField[] = [
  {
    type: "row",
    fields: [x, facebook],
  },
  {
    type: "row",
    fields: [linkedin, instagram],
  },
  {
    type: "row",
    fields: [
      {
        type: "text",
        name: "website",
        label: "Sitio Web",
        admin: {
          placeholder: "https://example.com",
        },
      },
    ],
  },
]

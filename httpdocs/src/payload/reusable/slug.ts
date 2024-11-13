import formatSlug from "@/payload/utils/formatSlug"
import type { Field } from "payload"
import { deepMerge } from "payload"

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const slugField: Slug = (fieldToUse = "title", overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
      index: true,
      label: "Slug",
    },
    overrides,
  )

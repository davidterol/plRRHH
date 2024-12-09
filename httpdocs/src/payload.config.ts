// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import sharp from "sharp"

import { Users } from "./payload/collections/users/Users"
import { Media } from "./payload/collections/Media"
import { Requests } from "./payload/collections/Requests"
import { Employees } from "./payload/collections/users/Employees"
import { masqueradePlugin } from "payload-plugin-masquerade"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const payloadFolder = path.resolve(dirname, "payload")

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    custom: {
      css: path.resolve("/styles/global.scss"),
    },
    components: {
      // header: CustomHeader,
      // beforeDashboard: DasboardCustom,
      views: {
        CustomPage: {
          Component: "/payload/components/views/calendarView",
          meta: {
            title: "Calendar",
          },
          path: "/calendar",
          exact: true,
        },
      },
      afterNavLinks: ["/payload/components/AfterNavCustom#AfterNavCustom"],
    },
  },
  collections: [Users, Employees, Media, Requests],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
    migrationDir: path.resolve(payloadFolder, "migrations"),
  }),
  sharp,
  plugins: [masqueradePlugin({ enabled: true })],
})

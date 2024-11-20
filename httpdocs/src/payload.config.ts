// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/users/Users'
import { Media } from './payload/collections/Media'
import { Request } from './payload/collections/Request'
import { Employees } from './payload/collections/users/Employees'

import { CustomViews } from './payload/collections/Views'
import { CustomPage } from './payload/components/views/CustomPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const payloadFolder = path.resolve(dirname, 'payload')

export default buildConfig({
  admin: {
    // user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },
    custom: {
      css: path.resolve('/styles/global.css'),
    },
    components: {
      // afterNavLinks: [
      //   '@/payload/components/afterNavLinks/LinkToCustomView#LinkToCustomView',
      //   '@/payload/components/afterNavLinks/LinkToCustomMinimalView#LinkToCustomMinimalView',
      //   '@/payload/components/afterNavLinks/LinkToCustomDefaultView#LinkToCustomDefaultView',
      //   '@/payload/components/AfterNavCustom#AfterNavCustom'
      // ],
      afterNavLinks: ["/payload/components/AfterNavCustom#AfterNavCustom"],
    },
    // avatar: {
    //   Component: "/payload/components/user/Avatar",
    // },
  },
  collections: [Users, Employees, Media, Request],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    migrationDir: path.resolve(payloadFolder, 'migrations'),
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})

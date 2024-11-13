import type { CollectionConfig } from 'payload'

export const CustomViews: CollectionConfig = {
  slug: 'custom-views',
  admin: {
    components: {
      views: {
        edit: {
          customView: {
            Component: '@/payload/collections/Views/components/CustomTabEditView#CustomTabEditView',
            path: '/custom-tab',
            tab: {
              href: '/custom-tab',
              label: 'Custom Tab',
            },
          },
          default: {
            Component: '@/payload/collections/Views/components/CustomDefaultEditView#CustomDefaultEditView',
          },
        },
      },
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
  ],
}
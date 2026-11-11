import type { CollectionConfig, Field } from 'payload'

export const pluralFormsSlug = 'plural-forms'

export const pluralFormsFieldNames = Array.from({ length: 21 }, (_, index) => `field${index + 1}`)

export const PluralFormsCollection: CollectionConfig = {
  slug: pluralFormsSlug,
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'group',
      type: 'group',
      fields: pluralFormsFieldNames.map((name): Field => ({ name, type: 'text' })),
    },
  ],
  versions: true,
}

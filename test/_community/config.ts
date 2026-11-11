import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { ru } from 'payload/i18n/ru'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'
import { MediaCollection } from './collections/Media/index.js'
import {
  PluralFormsCollection,
  pluralFormsFieldNames,
  pluralFormsSlug,
} from './collections/PluralForms/index.js'
import { PostsCollection, postsSlug } from './collections/Posts/index.js'
import { MenuGlobal } from './globals/Menu/index.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [PostsCollection, MediaCollection, PluralFormsCollection],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor({}),
  i18n: {
    fallbackLanguage: 'ru',
    supportedLanguages: { ru },
  },
  globals: [
    // ...add more globals here
    MenuGlobal,
  ],
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    await payload.create({
      collection: postsSlug,
      data: {
        title: 'example post',
      },
    })

    // Two documents with one version each: 2 and 21 changed fields
    for (const changedFieldsCount of [2, 21]) {
      const doc = await payload.create({
        collection: pluralFormsSlug,
        data: { title: `${changedFieldsCount} changed fields` },
      })

      await payload.update({
        id: doc.id,
        collection: pluralFormsSlug,
        data: {
          group: Object.fromEntries(
            pluralFormsFieldNames.slice(0, changedFieldsCount).map((name) => [name, 'changed']),
          ),
        },
      })
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

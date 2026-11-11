import { initI18n } from '@payloadcms/translations'
import { ru } from 'payload/i18n/ru'
import { describe, expect, it } from 'vitest'

// Russian plural forms depend on the last digits of the number, not on fixed thresholds:
// 1, 21, 101 -> "one"; 2-4, 22-24 -> "few"; 0, 5-20, 25-30 -> "many".
describe('Russian plural forms', () => {
  it.each([
    [1, '1 измененное поле'],
    [2, '2 измененных поля'],
    [4, '4 измененных поля'],
    [5, '5 измененных полей'],
    [11, '11 измененных полей'],
    [21, '21 измененное поле'],
    [22, '22 измененных поля'],
  ])(
    'should use the correct form of version:changedFieldsCount for %s',
    async (count, expected) => {
      const i18n = await initI18n({
        config: { fallbackLanguage: 'ru', supportedLanguages: { ru }, translations: {} },
        context: 'client',
        language: 'ru',
      })

      expect(i18n.t('version:changedFieldsCount', { count })).toBe(expected)
    },
  )
})

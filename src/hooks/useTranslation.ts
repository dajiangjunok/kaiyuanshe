/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import zhTW from '../../locales/zh-TW/common.json'
import zhCN from '../../locales/zh-CN/common.json'
import en from '../../locales/en/common.json'

const translations = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,

  en: en
} as const

type LocaleType = keyof typeof translations

export function useTranslation() {
  const router = useRouter()
  const { locale = 'zh-CN' } = router

  const t = useMemo(() => {
    const currentTranslations =
      translations[locale as LocaleType] || translations['zh-CN']

    return (key: string): string => {
      const keys = key.split('.')
      let value: any = currentTranslations

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return key // 如果找不到翻译，返回原始 key
        }
      }

      return typeof value === 'string' ? value : key
    }
  }, [locale])

  const changeLanguage = (newLocale: string) => {
    router.push(router.asPath, router.asPath, { locale: newLocale })
  }

  return {
    t,
    locale,
    changeLanguage
  }
}

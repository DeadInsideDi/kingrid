export const SUPPORTED_LOCALES = ['en', 'ru'] as const
export const DEFAULT_LOCALE = 'en'

export const SUPPORTED_LOCALES_NAMES = {
	en: 'English',
	ru: 'Русский',
}

export const loadTranslation = (locale: string) =>
	import(`../i18n/locales/${locale}.json`).then(module => module.default)

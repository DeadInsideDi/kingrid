'use client'

import { SUPPORTED_LOCALES } from '@/config/translation.config'
import { useLanguageStore } from '@/store/language.store'
import {
	useTranslation,
	useTranslationChange,
	type TranslationValues,
} from 'i18nano'
import type {
	SupportedLocale,
	TranslationKey,
} from '../types/translation.types'
import { getPluralIndex } from '../utils/plural.utils'

export interface Localization {
	t: (path: TranslationKey, values?: TranslationValues) => string
	currentLocale: SupportedLocale
	supportedLocales: SupportedLocale[]
	change: (locale: SupportedLocale) => void
	preload: (locale: SupportedLocale) => void
}

export const useLocalization = () => {
	const { change, preload } = useTranslationChange()
	const { currentLanguage, setCurrentLanguage } = useLanguageStore()

	const lang = currentLanguage as SupportedLocale
	const translation = useTranslation()

	const t = (path: TranslationKey, values?: TranslationValues) => {
		if (!values || !Object.entries(values).length) return translation(path)
		const count = +Object.entries(values)[0][1]
		const pluralIndex = getPluralIndex(lang, count)
		return translation(`${path}.${pluralIndex}`, values)
	}

	return {
		t,
		lang,
		all: SUPPORTED_LOCALES,
		change: (locale: SupportedLocale) => {
			change(locale)
			setCurrentLanguage(locale)
		},
		preload: (locale: SupportedLocale) => preload(locale),
	}
}

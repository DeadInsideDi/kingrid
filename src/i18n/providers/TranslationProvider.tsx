'use client'

import { SUPPORTED_LOCALES, loadTranslation } from '@/config/translation.config'
import { useLanguageStore } from '@/store/language.store'
import { TranslationProvider as I18nanoProvider } from 'i18nano'
import { useEffect, useState, type FC, type PropsWithChildren } from 'react'
import type { Translations } from '../types/translation.types'

const translations = SUPPORTED_LOCALES.reduce((acc, locale) => {
	acc[locale] = () => loadTranslation(locale)
	return acc
}, {} as Translations)

export const TranslationProvider: FC<PropsWithChildren> = ({ children }) => {
	const [mounted, setMounted] = useState(false)
	const currentLanguage = useLanguageStore(state => state.currentLanguage)

	useEffect(() => setMounted(true), [])
	if (!mounted) return null

	return (
		<I18nanoProvider
			translations={translations}
			language={currentLanguage}
			transition
		>
			{children}
		</I18nanoProvider>
	)
}

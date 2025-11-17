import { DEFAULT_LOCALE } from '@/config/translation.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SupportedLanguage = 'en' | 'ru'

export interface LanguageStore {
	currentLanguage: SupportedLanguage
	setCurrentLanguage: (language: SupportedLanguage) => void
}

export const useLanguageStore = create<LanguageStore>()(
	persist(
		set => ({
			currentLanguage: DEFAULT_LOCALE,
			setCurrentLanguage: language => set({ currentLanguage: language }),
		}),
		{
			name: 'language-storage',
		},
	),
)

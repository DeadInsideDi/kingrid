import { SUPPORTED_LOCALES } from '@/config/translation.config'
import type enTranslations from '../locales/en.json'

export type TranslationStructure = typeof enTranslations
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

type TranslationLeaf = string | string[]
type PathSegment<S extends string, K extends string> = S extends ''
	? K
	: `${S}.${K}`

export type TranslationPath<T extends object, S extends string = ''> = {
	[K in keyof T & string]: T[K] extends TranslationLeaf
		? PathSegment<S, K>
		: T[K] extends object
			? TranslationPath<T[K], PathSegment<S, K>>
			: never
}[keyof T & string]

export type TranslationKey = TranslationPath<TranslationStructure>

export type Translations = Record<
	SupportedLocale,
	() => Promise<{ default: TranslationStructure }>
>

import type { SupportedLocale } from '../types/translation.types'

export const getPluralIndex = (
	locale: SupportedLocale,
	count: number,
): number => {
	const absoluteCount = Math.abs(count)

	switch (locale) {
		case 'ru':
			if (absoluteCount === 0) return 0
			if (absoluteCount === 1) return 1
			if (
				absoluteCount % 10 >= 2 &&
				absoluteCount % 10 <= 4 &&
				!(absoluteCount % 100 >= 12 && absoluteCount % 100 <= 14)
			) {
				return 2
			}
			return 3

		case 'en':
		default:
			if (absoluteCount === 0) return 0
			if (absoluteCount === 1) return 1
			return 2
	}
}

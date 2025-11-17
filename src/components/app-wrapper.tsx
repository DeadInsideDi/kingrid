'use client'
import { useLocalization } from '@/i18n'
import { useThemeStore } from '@/store/theme.store'
import type { FC, PropsWithChildren } from 'react'

export const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
	const { currentTheme } = useThemeStore()
	const { lang } = useLocalization()

	return (
		<html
			lang={lang}
			data-theme={currentTheme}
			data-scroll-behavior='smooth'
		>
			{children}
		</html>
	)
}

import type { Theme } from '@/config/theme.config'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ThemeStore {
	currentTheme: Theme
	setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		set => ({
			currentTheme: 'system',
			setTheme: (theme: Theme) =>
				set(() => ({
					currentTheme: theme,
				})),
		}),
		{
			name: 'theme-storage',
		},
	),
)

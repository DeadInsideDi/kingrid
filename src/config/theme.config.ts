export const THEMES = ['light', 'dark', 'system'] as const
export type Theme = (typeof THEMES)[number]

export const THEMES_NAMES: Record<Theme, string> = {
	light: 'Light',
	dark: 'Dark',
	system: 'System',
} as const

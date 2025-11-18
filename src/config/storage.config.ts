export const COOKEI = {
	COOKIE_OPTIONS: {
		domain: process.env.NEXT_PUBLIC_SITE_URL,
		sameSite: 'none',
	},
	ACCESS_TOKEN: 'access_token',
	REFRESH_TOKEN: 'refresh_token',
} as const

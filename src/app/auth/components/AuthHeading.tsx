'use client'

import { useLocalization } from '@/i18n'
import { useAuthStore } from '@/store/auth.store'
import { type FC } from 'react'

export const AuthHeading: FC = () => {
	const authAction = useAuthStore(state => state.authAction)
	const { t } = useLocalization()
	// react key is required for animation
	return (
		<>
			<h1 key={authAction + 'h1'}>{t(`auth.heading.title.${authAction}`)}</h1>
			<p key={authAction + 'p'}>{t(`auth.heading.subtitle.${authAction}`)}</p>
		</>
	)
}

'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useLocalization } from '@/i18n'
import buttonStyles from '@/shared/ui/button.module.scss'
import Link from 'next/link'
import { type FC } from 'react'
import s from './AuthButtons.module.scss'

export const AuthButtons: FC = () => {
	const { t } = useLocalization()

	return (
		<>
			<Link
				rel='nofollow'
				href={DASHBOARD_PAGES.LOGIN}
				className={`${buttonStyles.btn} ${s.login}`}
			>
				{t('user.login')}
			</Link>
			<Link
				rel='nofollow'
				href={DASHBOARD_PAGES.SIGNUP}
				className={`${buttonStyles.btn} ${s.signup}`}
			>
				{t('user.sign-up')}
			</Link>
		</>
	)
}

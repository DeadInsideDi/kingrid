'use client'

import { useLocalization } from '@/i18n'
import Link from 'next/link'
import { type FC } from 'react'

export const AuthDisclaimer: FC = () => {
	const { t } = useLocalization()

	return (
		<p>
			{t('rights.disclaimer')}
			<Link
				href='/terms'
				rel='noopener noreferrer'
				target='_blank'
			>
				{t('rights.terms-of-service')}
			</Link>
			{t('rights.and')}
			<Link
				href='/privacy'
				rel='noopener noreferrer'
				target='_blank'
			>
				{t('rights.privacy-policy')}
			</Link>
		</p>
	)
}

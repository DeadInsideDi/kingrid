'use client'

import { useLocalization } from '@/i18n'
import Link from 'next/link'
import { type FC } from 'react'
import s from './Navbar.module.scss'

export const Navbar: FC = () => {
	const { t } = useLocalization()

	return (
		<ol className={s.navbar}>
			<li>
				<Link href='#hero'>{t('header.menu.home')}</Link>
			</li>
			<li>
				<Link href='#how-it-works'>{t('header.menu.how-it-works')}</Link>
			</li>
			<li>
				<Link href='#features'>{t('header.menu.features')}</Link>
			</li>
			<li>
				<Link href='#pricing'>{t('header.menu.pricing')}</Link>
			</li>
			<li>
				<Link href='#reviews'>{t('header.menu.reviews')}</Link>
			</li>
		</ol>
	)
}

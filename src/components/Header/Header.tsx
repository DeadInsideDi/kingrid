'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useLocalization } from '@/i18n'
import Link from 'next/link'
import { useState, type FC } from 'react'
import { Logo } from '../../../public'
import { Navbar } from '../Navbar/Navbar'
import { LanguageSwitcher } from '../ui/LanguageSwitcher/LanguageSwitcher'
import { UserActions } from '../ui/UserActions/UserActions'
import s from './Header.module.scss'
import { HeaderBurger } from './HeaderBurger/HeaderBurger'

export const LogoLink: FC<{ className?: string }> = ({ className }) => {
	const { t } = useLocalization()

	return (
		<Link
			href={DASHBOARD_PAGES.HOME}
			aria-label={t('header.logo-link.aria-label')}
			title={t('header.logo-link.title')}
			className={[s.logo, className].join(' ')}
		>
			<Logo />
		</Link>
	)
}

export const Header: FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<>
			<header className={s.header}>
				<nav className={s.navigation}>
					<div className={s['app-actions']}>
						<LogoLink />
						<HeaderBurger
							isMobileMenuOpen={isMobileMenuOpen}
							setIsMobileMenuOpen={setIsMobileMenuOpen}
						/>
						<LanguageSwitcher />
					</div>

					<Navbar />
					<UserActions />
				</nav>
			</header>

			{isMobileMenuOpen && (
				<div
					className={s['mobile-menu']}
					id='mobile-menu'
					aria-live='polite'
				>
					<Navbar />
				</div>
			)}
		</>
	)
}

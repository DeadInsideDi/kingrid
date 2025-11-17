'use client'

import { useLocalization } from '@/i18n'
import { type Dispatch, type FC, type SetStateAction } from 'react'
import s from './HeaderBurger.module.scss'

export type HeaderBurgerProps = {
	isMobileMenuOpen: boolean
	setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const HeaderBurger: FC<HeaderBurgerProps> = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}) => {
	const { t } = useLocalization()

	return (
		<button
			className={s['header-burger']}
			onClick={() => setIsMobileMenuOpen(isOpen => !isOpen)}
			title={t('header.burger.title', { isOpen: isMobileMenuOpen ? '1' : '0' })}
			aria-controls='mobile-menu'
			aria-expanded={isMobileMenuOpen}
			aria-haspopup
		></button>
	)
}

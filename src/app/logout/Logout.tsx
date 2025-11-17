'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useLogout } from '@/hooks/useLogout'
import { useUser } from '@/hooks/user/useUser'
import { useLocalization } from '@/i18n'
import { useAuthStore } from '@/store/auth.store'
import { LogOut, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'
import s from './page.module.scss'

export const Logout: FC = () => {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	const { mutate: logout } = useLogout()
	const { data: user } = useUser()
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const { t } = useLocalization()
	useEffect(() => {
		if (!isAuthenticated) redirect(DASHBOARD_PAGES.HOME)
	}, [isAuthenticated])

	const handleLogout = () => {
		logout()
		setIsLoggingOut(true)
	}

	const handleCancel = () => window.history.back()

	if (!user) return null

	return (
		<div className={s.logout}>
			<div className={s.icon}>
				<LogOut />
			</div>

			<h1 className={s.title}>{t('user.logout')}</h1>
			<p className={s.message}>{t('logout.message')}</p>

			<div className={s['user-info']}>
				<div className={s['user-avatar']}>
					{user.avatarImageUrl ? (
						<Image
							src={user.avatarImageUrl}
							alt=''
							width={32}
							height={32}
						/>
					) : (
						user.username.slice(0, 1).toUpperCase()
					)}
				</div>
				<div className={s['user-details']}>
					<span className={s['user-name']}>{user.username}</span>
					{user?.email && <span className={s['user-email']}>{user.email}</span>}
				</div>
			</div>

			<div className={s.options}>
				<button
					className={`${s.btn} ${s['btn-logout']}`}
					onClick={handleLogout}
					disabled={isLoggingOut}
				>
					{t(`user.logout${isLoggingOut ? '-loading' : ''}`)}
				</button>
				<button
					className={`${s.btn} ${s['btn-cancel']}`}
					onClick={handleCancel}
					disabled={isLoggingOut}
				>
					{t('general.cancel')}
				</button>
			</div>

			<div className={s['security-note']}>
				<ShieldCheck />
				{t('logout.security-note')}
			</div>
		</div>
	)
}

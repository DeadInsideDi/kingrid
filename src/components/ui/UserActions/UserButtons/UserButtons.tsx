'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useOutside } from '@/hooks/useOutside'
import { useUser } from '@/hooks/user/useUser'
import { useLocalization } from '@/i18n'
import { Bell } from 'lucide-react'
import Image from 'next/image'
import { type FC } from 'react'
import s from './UserButtons.module.scss'

const MAX_USERNAME_LENGTH = 22

export const UserContentButton: FC = () => {
	const { data: userData } = useUser()
	const { isShow, setIsShow, ref } = useOutside(false)
	const { t } = useLocalization()

	const userImage = userData?.avatarImageUrl ? (
		<Image
			src={userData?.avatarImageUrl}
			alt={t('user.avatar')}
		/>
	) : (
		<div className={s['user-text-avatar']}>
			{userData?.username.charAt(0).toUpperCase()}
		</div>
	)

	let userName = userData?.email || userData?.username || t('user.basename')
	if (userName.length > MAX_USERNAME_LENGTH)
		userName = userName.slice(0, MAX_USERNAME_LENGTH) + '...'

	return (
		<nav ref={ref}>
			<button
				className={s['user-avatar-button']}
				onClick={() => setIsShow(isShow => !isShow)}
				aria-expanded={isShow}
				aria-label={t('user.avatar-button.aria-label')}
				title={t('user.avatar-button.title')}
				aria-controls='user-menu'
				aria-haspopup
			>
				{userImage}
			</button>
			<div
				id='user-menu'
				hidden={!isShow}
			>
				<div className={s['user-menu-header']}>
					{userImage}{' '}
					<ul>
						<li>{userName}</li>
						{userData?.phone && <li>{userData.phone}</li>}
					</ul>
				</div>
				<hr />
				<ol>
					<li>
						<a
							href={DASHBOARD_PAGES.LOGOUT}
							tabIndex={isShow ? 0 : -1}
						>
							{t('user.logout')}
						</a>
					</li>
				</ol>
			</div>
		</nav>
	)
}

export const UserButtons: FC = () => {
	return (
		<div className={s['user-buttons']}>
			<button>
				<Bell />
			</button>
			<UserContentButton />
		</div>
	)
}

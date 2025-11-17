'use client'

import { useUser } from '@/hooks/user/useUser'
import { type FC } from 'react'
import { AuthButtons } from './AuthButtons/AuthButtons'
import s from './UserActions.module.scss'
import { UserButtons } from './UserButtons/UserButtons'

export const UserActions: FC = () => {
	const { data } = useUser()

	return (
		<div className={s['user-actions']}>
			{data?.id ? <UserButtons /> : <AuthButtons />}
		</div>
	)
}

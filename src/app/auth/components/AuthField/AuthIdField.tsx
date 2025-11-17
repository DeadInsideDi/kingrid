'use client'

import { useLocalization } from '@/i18n'
import { useAuthStore } from '@/store/auth.store'
import { isEmail, isPhone } from '@/utils/auth.utils'
import { IdCard, Mail, Phone, UserRound } from 'lucide-react'
import { type FC } from 'react'
import s from './fieldStyles.module.scss'

export type AuthIdIconProps = {
	authId: string
}

const AuthIdIcon: FC<AuthIdIconProps> = ({ authId }) => {
	if (!authId) return <IdCard />
	if (isEmail(authId)) return <Mail />
	if (isPhone(authId)) return <Phone />
	return <UserRound />
}

export const AuthIdField: FC = () => {
	const authId = useAuthStore(state => state.authId)
	const setAuthId = useAuthStore(state => state.setAuthId)
	const invalid = useAuthStore(state => state.authIdInvalid)
	const setInvalid = useAuthStore(state => state.setIsAuthIdInvalid)
	const { t } = useLocalization()

	if (invalid && document.activeElement?.id !== 'password')
		document.getElementById('authId')?.focus()

	return (
		<div className={s['input-field']}>
			<input
				autoFocus
				id='authId'
				required
				autoComplete='email'
				title={t('auth.fields.auth-id.title')}
				value={authId}
				onChange={e => {
					if (invalid) setInvalid(false)
					setAuthId(e.target.value)
				}}
				aria-invalid={invalid}
			/>
			<label htmlFor='authId'>{t('auth.fields.auth-id.label')}</label>
			<AuthIdIcon authId={authId} />
		</div>
	)
}

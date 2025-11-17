'use client'

import { Eye, EyeOff, Lock } from 'lucide-react'
import { useState, type FC } from 'react'

import { useLocalization } from '@/i18n'
import { useAuthStore } from '@/store/auth.store'
import s from './fieldStyles.module.scss'

export const PasswordField: FC = () => {
	const [pressed, setPressed] = useState(false)
	const password = useAuthStore(state => state.password)
	const setPassword = useAuthStore(state => state.setPassword)
	const invalid = useAuthStore(state => state.passwordInvalid)
	const setInvalid = useAuthStore(state => state.setIsPasswordInvalid)
	const { t } = useLocalization()

	const togglePasswordVisibility = () => {
		setPressed(pressed => !pressed)
		setTimeout(() => {
			const input = document.getElementById('password') as HTMLInputElement
			const { length } = input.value
			input.setSelectionRange(length, length)
			input.focus()
		}, 10)
	}

	if (invalid) document.getElementById('password')?.focus()

	return (
		<div className={`${s['input-field']} ${s['password-field']}`}>
			<input
				id='password'
				required
				autoComplete='current-password'
				title={t('auth.fields.password.title')}
				type={pressed ? 'text' : 'password'}
				aria-invalid={invalid}
				value={password}
				onChange={e => {
					if (invalid) setInvalid(false)
					setPassword(e.currentTarget.value)
				}}
			/>
			<label htmlFor='password'>{t('auth.fields.password.label')}</label>
			<Lock />
			<button
				type='button'
				title={t('auth.fields.password.eye-button-title', {
					isShow: pressed ? '1' : '0',
				})}
				onClick={togglePasswordVisibility}
				aria-pressed={pressed}
			>
				{pressed ? <Eye /> : <EyeOff />}
			</button>
		</div>
	)
}

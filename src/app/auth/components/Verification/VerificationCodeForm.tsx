'use client'

import { ERROR_DURATION } from '@/api/utils/error-handler'
import { LogoLink } from '@/components/Header/Header'
import { useLocalization } from '@/i18n'
import { useAuthStore } from '@/store/auth.store'
import { memo, useRef, useState, type FC } from 'react'
import { useResendCode } from '../../hooks/useResendCode'
import { useVerification } from '../../hooks/useVerification'
import s from '../../page.module.scss'
import { AuthCodeField } from './AuthCodeField'
import verificationStyles from './verificationStyles.module.scss'

export const VerificationCodeForm: FC = memo(() => {
	const activationToken = useAuthStore(state => state.activationToken)
	const verificationCodeInvalid = useAuthStore(
		state => state.verificationCodeInvalid,
	)
	const { type: verificationType, contact: verificationContact } = useAuthStore(
		state => state.verificationInfo,
	)

	const [formIsDisabled, setFormIsDisabled] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)

	const { mutate: mutateVerification } = useVerification()
	const { mutate: mutateResendCode, isPending: isPendingResend } =
		useResendCode()

	const { t } = useLocalization()

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = formRef.current
		if (!form || formIsDisabled) return
		setFormIsDisabled(true)

		mutateVerification()

		setTimeout(() => {
			form.reset()
			form.querySelector('input')?.focus()
			setFormIsDisabled(false)
		}, ERROR_DURATION)
	}

	return (
		<form
			ref={formRef}
			hidden={!activationToken}
			className={verificationStyles['verification-code-form']}
			onSubmit={onSubmit}
			data-invalid={verificationCodeInvalid}
		>
			<LogoLink className={s.logo} />

			<h1>{t(`auth.verification.title.${verificationType}`)}</h1>
			<p>
				{t('auth.verification.message')} <b>{verificationContact}</b>
			</p>

			<AuthCodeField />

			<p>
				{t('auth.verification.not-received-code')}
				<button
					type='button'
					onClick={() => mutateResendCode()}
					disabled={formIsDisabled || isPendingResend}
					aria-disabled={formIsDisabled || isPendingResend}
					title={t(`auth.verification.resend-title.${verificationType}`)}
				>
					{t(
						`auth.verification.resend-code${isPendingResend ? '-loading' : ''}`,
					)}
				</button>
			</p>
		</form>
	)
})

VerificationCodeForm.displayName = 'VerificationCodeForm'

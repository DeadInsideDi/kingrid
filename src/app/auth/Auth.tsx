'use client'

import { LogoLink } from '@/components/Header/Header'
import { useLocalization } from '@/i18n'
import { useAuthStore } from '@/store/auth.store'
import Image from 'next/image'
import { useEffect, type FC } from 'react'
import { AuthDisclaimer } from './components/AuthDisclaimer'
import { AuthIdField } from './components/AuthField/AuthIdField'
import { PasswordField } from './components/AuthField/PasswordField'
import { AuthHeading } from './components/AuthHeading'
import { RedirectButton } from './components/RedirectButton'
import { SubmitButton } from './components/SubmitButton'
import { VerificationCodeForm } from './components/Verification/VerificationCodeForm'
import { useLogin } from './hooks/useLogin'
import { useRegister } from './hooks/useRegister'
import s from './page.module.scss'

export const Auth: FC = () => {
	const authAction = useAuthStore(state => state.authAction)
	const resetAuthIvalids = useAuthStore(state => state.resetAuthIvalids)

	useEffect(() => resetAuthIvalids(), [authAction, resetAuthIvalids])

	const { mutate: mutateLogin, isPending: isPendingLogin } = useLogin()
	const { mutate: mutateSignup, isPending: isPendingSignup } = useRegister()

	const { t } = useLocalization()

	return (
		<div className={s.auth}>
			<section>
				<form
					className={s['auth-form']}
					onSubmit={e => {
						e.preventDefault()
						if (authAction === 'login') mutateLogin()
						else mutateSignup()
					}}
				>
					<LogoLink className={s.logo} />
					<AuthHeading />
					<AuthIdField />
					<PasswordField />
					<SubmitButton isPending={isPendingLogin || isPendingSignup} />
					<RedirectButton />
					<AuthDisclaimer />
				</form>

				<VerificationCodeForm />
			</section>
			<Image
				src='/tree-1.png'
				alt={t('auth.tree-image-alt')}
				width={0}
				height={0}
				sizes='100vw'
			/>
		</div>
	)
}

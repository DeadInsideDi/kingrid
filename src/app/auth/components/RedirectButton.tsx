import { useLocalization } from '@/i18n'
import { useAuthStore } from '@/store/auth.store'
import { type FC } from 'react'

export const RedirectButton: FC = () => {
	const authAction = useAuthStore(state => state.authAction)
	const setAuthAction = useAuthStore(state => state.setAuthAction)
	const { t } = useLocalization()

	const newAuthAction = authAction === 'login' ? 'signup' : 'login'

	return (
		<p key={authAction + 'p'}>
			{t(`auth.redirect-button.${authAction}`)}
			<button
				type='button'
				title={t(`auth.redirect-button.title.${authAction}`)}
				onClick={() => setAuthAction(newAuthAction)}
			>
				{t(`auth.submit.${newAuthAction}`)}
			</button>
		</p>
	)
}

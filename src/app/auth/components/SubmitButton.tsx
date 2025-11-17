'use client'

import { useLocalization } from '@/i18n'
import s from '@/shared/ui/button.module.scss'
import { useAuthStore } from '@/store/auth.store'
import { Loader } from 'lucide-react'
import { type FC } from 'react'

export type SubmitButtonProps = {
	isPending: boolean
}

export const SubmitButton: FC<SubmitButtonProps> = ({ isPending }) => {
	const authAction = useAuthStore(state => state.authAction)
	const { t } = useLocalization()

	return (
		<button
			key={authAction}
			type='submit'
			disabled={isPending}
			className={`${s.btn} ${s.primary}`}
		>
			{isPending ? <Loader /> : t(`auth.submit.${authAction}`)}
		</button>
	)
}

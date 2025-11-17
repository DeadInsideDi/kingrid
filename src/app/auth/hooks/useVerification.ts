import {
	handleDefaultError,
	handleExpiredCode,
	handleInvalidCode,
	handleRateLimitError,
} from '@/api/utils/error-handler'
import { useLocalization } from '@/i18n'
import { authService } from '@/services/auth.service'
import { useAuthStore, type AuthStore } from '@/store/auth.store'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const setInvalid = (
	time: number,
	setIsVerificationCodeInvalid: AuthStore['setIsVerificationCodeInvalid'],
) => {
	setIsVerificationCodeInvalid(true)
	setTimeout(() => setIsVerificationCodeInvalid(false), time)
}

export const useVerification = () => {
	const setIsVerificationCodeInvalid = useAuthStore(
		state => state.setIsVerificationCodeInvalid,
	)
	const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
	const { t } = useLocalization()
	const verifiedMessage = t('toast.success.verified')

	return useMutation({
		mutationFn: () => {
			const { activationToken: token, verificationCode: code } =
				useAuthStore.getState()
			return authService.activeAccount({ token, code })
		},
		onSuccess() {
			setIsAuthenticated(true)
			toast.success(verifiedMessage)
		},
		onError({ message }) {
			if (
				handleInvalidCode(message, time =>
					setInvalid(time, setIsVerificationCodeInvalid),
				)
			)
				return

			if (
				handleRateLimitError(message, time =>
					setInvalid(time, setIsVerificationCodeInvalid),
				)
			)
				return

			if (
				handleExpiredCode(message, time =>
					setInvalid(time, setIsVerificationCodeInvalid),
				)
			)
				return

			handleDefaultError(message)
		},
	})
}

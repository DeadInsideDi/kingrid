import {
	handleAuthIdError,
	handleDefaultError,
	handlePasswordError,
	handleRateLimitError,
} from '@/api/utils/error-handler'
import { useLocalization } from '@/i18n'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { parseToAuthPayload } from '@/utils/auth.utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useRegister = () => {
	const {
		setIsAuthIdInvalid,
		setIsPasswordInvalid,
		setPassword,
		setVerificationInfo,
		setIsAuthenticated,
		setActivationToken,
	} = useAuthStore.getState()

	const { t } = useLocalization()
	const confirmEmailMessage = t('toast.info.confirm-email')
	const successMessage = t('toast.success.signup')

	return useMutation({
		mutationFn: () => {
			const { authId, password } = useAuthStore.getState()
			const payload = parseToAuthPayload({ authId, password })
			setVerificationInfo(payload)
			return authService.register(payload)
		},
		onSuccess(response) {
			setPassword('')
			if (response.data.id === null) {
				setActivationToken(response.data.activationToken)
				toast.info(confirmEmailMessage)
			} else {
				setIsAuthenticated(true)
				toast.success(successMessage)
			}
		},
		onError({ message }) {
			if (handleAuthIdError(message, () => setIsAuthIdInvalid(true))) return
			if (handlePasswordError(message, () => setIsPasswordInvalid(true))) return
			if (handleRateLimitError(message)) return
			handleDefaultError(message)
		},
	})
}

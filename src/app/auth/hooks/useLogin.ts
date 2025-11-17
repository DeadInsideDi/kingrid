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

export const useLogin = () => {
	const {
		setIsAuthIdInvalid,
		setIsPasswordInvalid,
		setPassword,
		setIsAuthenticated,
	} = useAuthStore.getState()

	const { t } = useLocalization()
	const successMessage = t('toast.success.login')

	return useMutation({
		mutationFn: () => {
			const { authId, password } = useAuthStore.getState()
			return authService.login(parseToAuthPayload({ authId, password }))
		},
		onSuccess() {
			setPassword('')
			setIsAuthenticated(true)
			toast.success(successMessage)
		},
		onError({ message }) {
			if (handleAuthIdError(message, () => setIsAuthIdInvalid(true))) return
			if (handlePasswordError(message, () => setIsPasswordInvalid(true))) return
			if (handleRateLimitError(message)) return
			handleDefaultError(message)
		},
	})
}

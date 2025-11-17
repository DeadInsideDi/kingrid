import {
	handleDefaultError,
	handleRateLimitError,
} from '@/api/utils/error-handler'
import { useLocalization } from '@/i18n'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useResendCode = () => {
	const setActivationToken = useAuthStore(state => state.setActivationToken)
	const { t } = useLocalization()
	const codeResentMessage = t('toast.info.code-resent')

	return useMutation({
		mutationFn: () =>
			authService.resendCode(useAuthStore.getState().activationToken),
		onSuccess(response) {
			toast.info(codeResentMessage)
			setActivationToken(response.data.activationToken)
		},
		onError({ message }) {
			if (handleRateLimitError(message)) return
			handleDefaultError(message)
		},
	})
}

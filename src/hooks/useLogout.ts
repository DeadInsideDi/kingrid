import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useLocalization } from '@/i18n'
import { authService } from '@/services/auth.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useLogout = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { t } = useLocalization()
	const logoutMessage = t('toast.success.logout')

	return useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ['user'] })
			toast.success(logoutMessage)
			router.push(DASHBOARD_PAGES.HOME)
		},
	})
}

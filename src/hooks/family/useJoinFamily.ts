import {
	handleDefaultError,
	isNotFoundError,
	isPasswordError,
} from '@/api/utils/error-handler'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { familyService } from '@/services/family.service'
import { useAuthTreeStore } from '@/store/auth-tree.store'
import { useAuthStore } from '@/store/auth.store'
import type { FamilyCreatePayload } from '@/types/family.types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useJoinFamily = () => {
	const router = useRouter()
	const { setTreePassword, setTreeName, setIsOpen } =
		useAuthTreeStore.getState()

	return useMutation({
		mutationFn: (data: FamilyCreatePayload) =>
			familyService.connectToFamily(data),
		onSuccess: () => {
			useAuthStore.getState().setIsAuthenticated(true)
			router.push(DASHBOARD_PAGES.TREE)
		},
		onError({ message }, { name, password }) {
			setIsOpen(true)
			handleDefaultError(message)
			if (isPasswordError(message)) setTreeName(name)
			if (isNotFoundError(message)) setTreePassword(password)
		},
	})
}

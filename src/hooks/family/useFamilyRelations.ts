import { isUnauthorizedError } from '@/api/utils/error-handler'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { relationsService } from '@/services/relations.service'
import { useAuthStore } from '@/store/auth.store'
import { useLanguageStore } from '@/store/language.store'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useUser } from '../user/useUser'

export const useFamilyRelations = () => {
	const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
	const { data: user } = useUser()
	const memberId = user?.familyMemberId
	const router = useRouter()

	return useQuery({
		queryKey: ['familyRelations', memberId],
		queryFn: () => {
			if (!memberId) return null
			const language = useLanguageStore.getState().currentLanguage

			return relationsService
				.getRelations(memberId, language)
				.then(res => res.data)
		},
		retry(_, { message }) {
			if (isUnauthorizedError(message)) {
				setIsAuthenticated(false)
				router.push(DASHBOARD_PAGES.HOME)
				return true
			}

			return false
		},
	})
}

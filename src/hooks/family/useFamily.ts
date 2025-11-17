import { isUnauthorizedError } from '@/api/utils/error-handler'
import { familyService } from '@/services/family.service'
import { useAuthStore } from '@/store/auth.store'
import { useQuery } from '@tanstack/react-query'

export const useFamily = () => {
	const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)

	return useQuery({
		queryKey: ['family'],
		queryFn: () => familyService.getFamily().then(res => res.data),
		retry(_, { message }) {
			if (isUnauthorizedError(message)) {
				setIsAuthenticated(false)
				return true
			}

			return false
		},
	})
}

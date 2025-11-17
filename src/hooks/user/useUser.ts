import { isTokenError, isUnauthorizedError } from '@/api/utils/error-handler'
import { userService } from '@/services/user.service'
import { useAuthStore } from '@/store/auth.store'
import { useCacheStore } from '@/store/cache.store'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
	const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
	const setUser = useCacheStore(state => state.setUser)

	return useQuery({
		queryKey: ['user'],
		queryFn: () => userService.getUser().then(res => res.data),
		staleTime: Infinity,
		retry(_, { message }) {
			const authError = isUnauthorizedError(message) || isTokenError(message)
			if (!authError) return true
			setIsAuthenticated(false)
			setUser()
			return false
		},

		persister(queryFn, context) {
			const res = queryFn(context)
			Promise.resolve(res)
				.then(user => setUser(user))
				.catch(() => setUser())
			return res
		},

		placeholderData: useCacheStore.getState().user,
	})
}

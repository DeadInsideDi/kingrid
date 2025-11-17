import { authService } from '../../services/auth.service'
import type { CustomAxiosError, CustomAxiosRequestConfig } from '../axios.types'
import { authClient } from '../clients/auth.client'
import { isTokenExpiredError } from '../utils/error-handler'

export const refreshTokenInterceptor = async (error: CustomAxiosError) => {
	const originalRequest: CustomAxiosRequestConfig | undefined = error.config
	if (!originalRequest) return Promise.reject(error)

	const shouldRetry =
		error.response?.status === 401 &&
		!originalRequest._tokenRefreshed &&
		isTokenExpiredError(error)

	if (!shouldRetry) return Promise.reject(error)

	try {
		await authService.getNewTokens()
		originalRequest._tokenRefreshed = true

		return authClient(originalRequest)
	} catch (refreshError) {
		authService.logout()
		return Promise.reject(refreshError)
	}
}

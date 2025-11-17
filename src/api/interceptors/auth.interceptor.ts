import { getAccessToken } from '../../services/auth-token.service'
import type { CustomAxiosRequestConfig } from '../axios.types'

export const authInterceptor = (config: CustomAxiosRequestConfig) => {
	const token = getAccessToken()

	if (token && config.headers) config.headers.Authorization = `Bearer ${token}`

	return config
}

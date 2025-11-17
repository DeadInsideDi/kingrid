import type { CustomAxiosError } from '../axios.types'
import { parseError } from '../utils/error-handler'

export const errorInterceptor = (error: CustomAxiosError) => {
	const errorMessage = parseError(error)
	return Promise.reject(new Error(errorMessage))
}

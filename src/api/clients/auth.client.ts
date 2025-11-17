import { authInterceptor } from '../interceptors/auth.interceptor'
import { errorInterceptor } from '../interceptors/error.interceptor'
import { refreshTokenInterceptor } from '../interceptors/refresh.interceptor'
import { createBaseClient } from './base.client'

export const authClient = createBaseClient()

authClient.interceptors.request.use(authInterceptor)

authClient.interceptors.response.use(undefined, refreshTokenInterceptor)
authClient.interceptors.response.use(undefined, errorInterceptor)

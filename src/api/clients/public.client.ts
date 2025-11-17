import { errorInterceptor } from '../interceptors/error.interceptor'
import { createBaseClient } from './base.client'

export const publicClient = createBaseClient()

publicClient.interceptors.response.use(undefined, errorInterceptor)

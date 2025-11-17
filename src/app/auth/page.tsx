'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useAuthStore } from '@/store/auth.store'
import { notFound, redirect, useSearchParams } from 'next/navigation'
import { Auth } from './Auth'

export type AuthAction = 'login' | 'signup'

export default function AuthPage() {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	const setAuthAction = useAuthStore(state => state.setAuthAction)
	if (isAuthenticated) redirect(DASHBOARD_PAGES.HOME)

	const searchParams = useSearchParams()
	const authAction = searchParams.get('action') || 'login'

	if (authAction !== 'login' && authAction !== 'signup') notFound()
	setAuthAction(authAction)
	return <Auth />
}

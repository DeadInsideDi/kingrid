import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'
import { Logout } from './Logout'

export const metadata: Metadata = {
	title: 'Logout',
	...NO_INDEX_PAGE,
}

export default function LogoutPage() {
	return <Logout />
}

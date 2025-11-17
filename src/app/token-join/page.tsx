import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'
import { TokenJoin } from './TokenJoin'

export const metadata: Metadata = {
	title: 'Join To Tree',
	...NO_INDEX_PAGE,
}

export default function TokenJoinPage() {
	return <TokenJoin />
}

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'
import { Tree } from './Tree'

export const metadata: Metadata = {
	title: 'Tree',
	...NO_INDEX_PAGE,
}

export default function TreePage() {
	return <Tree />
}

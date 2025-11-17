'use client'

import { Features } from '@/app/(main)/Features/Features'
import s from './page.module.scss'

import { Hero } from '@/app/(main)/Hero/Hero'
import { Partners } from '@/app/(main)/Partners/Partners'
import { Pricing } from '@/app/(main)/Pricing/Pricing'
import { Reviews } from '@/app/(main)/Reviews/Reviews'
import { AuthTreeModal } from '@/components/AuthTreeModal/AuthTreeModal'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useFamily } from '@/hooks/family/useFamily'
import { useUser } from '@/hooks/user/useUser'
import { useAuthTreeStore } from '@/store/auth-tree.store'
import { useRouter } from 'next/navigation'
import { useEffect, type FC } from 'react'

export const Home: FC = () => {
	const router = useRouter()
	const treeInviteId = useAuthTreeStore(state => state.treeInviteId)
	const { data: family } = useFamily()
	const { data: user } = useUser()

	useEffect(() => {
		if (!user) return
		if (treeInviteId && family?.ownerId !== user.id)
			router.push(DASHBOARD_PAGES.tokenJoinWithId(treeInviteId))
	}, [family?.ownerId, treeInviteId, user, router])

	return (
		<main className={s.container}>
			<Hero />
			<Features />
			<Pricing />
			<Reviews />
			<Partners />
			<AuthTreeModal />
		</main>
	)
}

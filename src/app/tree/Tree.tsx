'use client'

import { connectionManager } from '@/components/Flow/connectionManager'
import { FlowContainer } from '@/components/Flow/FlowContainer'
import { FlowControls } from '@/components/Flow/FlowControls/FlowControls'
import { FlowPanel } from '@/components/Flow/FlowPanel/FlowPanel'
import { InvitePopup } from '@/components/Flow/InvitePopup/InvitePopup'
import { useSchema } from '@/components/Flow/useSchema'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useFamily } from '@/hooks/family/useFamily'
import { useUser } from '@/hooks/user/useUser'
import { useFlowStore } from '@/store/flow.store'
import { useRouter } from 'next/navigation'
import { useEffect, type FC } from 'react'
import s from './page.module.scss'

export const Tree: FC = () => {
	const router = useRouter()

	const setSchema = useFlowStore(state => state.setSchema)
	const setSelectedMemberId = useFlowStore(state => state.setSelectedMemberId)
	const { data: family, isLoading: isFamilyLoading } = useFamily()
	const { data: user } = useUser()

	const familyExists = !!family

	const schema = useSchema({
		members: family?.familyMembers || [],
	})

	useEffect(() => {
		if (user) setSelectedMemberId(user.familyMemberId || '')
	}, [user, user?.familyMemberId, setSelectedMemberId])

	useEffect(() => {
		setSchema(schema)
	}, [schema, setSchema])

	useEffect(() => {
		if (!familyExists && !isFamilyLoading) router.push(DASHBOARD_PAGES.HOME)
	}, [familyExists, isFamilyLoading, router])

	connectionManager.deleteAllConnections()

	return (
		<div className={s['tree-container']}>
			<FlowPanel />
			<FlowContainer />
			<FlowControls />
			<InvitePopup />
		</div>
	)
}

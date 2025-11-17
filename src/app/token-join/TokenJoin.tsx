'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useAcceptJoinInviteFamily } from '@/hooks/family/useAcceptJoinInviteFamily'
import { useFamily } from '@/hooks/family/useFamily'
import { useFamilyByInviteId } from '@/hooks/family/useFamilyByInviteId'
import { useUser } from '@/hooks/user/useUser'
import { useLocalization } from '@/i18n'
import { useAuthTreeStore } from '@/store/auth-tree.store'
import Image from 'next/image'
import { notFound, redirect, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, type FC } from 'react'
import s from './page.module.scss'

export const TokenJoin: FC = () => {
	const searchParams = useSearchParams()
	const inviteId = searchParams.get('id')
	const setTreeInviteId = useAuthTreeStore(state => state.setTreeInviteId)

	const { data: familyToJoin } = useFamilyByInviteId(inviteId)
	const { mutate: acceptJoinInvite } = useAcceptJoinInviteFamily()
	const { data: user, isLoading: isUserLoading } = useUser()
	const { data: family } = useFamily()
	const { t } = useLocalization()

	const cancel = useCallback(() => {
		setTreeInviteId(null)
		redirect(DASHBOARD_PAGES.HOME)
	}, [setTreeInviteId])

	useEffect(() => {
		setTreeInviteId(inviteId)
	}, [inviteId, setTreeInviteId])

	useEffect(() => {
		if (!isUserLoading && !user) redirect(DASHBOARD_PAGES.SIGNUP)
	}, [user, isUserLoading])

	useEffect(() => {
		if (family && familyToJoin && family.name === familyToJoin.name) cancel()
	}, [family, familyToJoin, cancel])

	if (!inviteId) return notFound()

	return (
		<div className={s['join-confirm']}>
			<h1 className={s.title}>{t('tree.token-join.title')}</h1>
			<p className={s.message}>
				{t('tree.token-join.message.0')} <b>{familyToJoin?.name}</b>
				{t('tree.token-join.message.1')}
				<b>{familyToJoin?._count.users || t('general.loading')}</b>
				{t('tree.token-join.message.2')}
				<b>{familyToJoin?._count.familyMembers || t('general.loading')}</b>
				{t('tree.token-join.message.3')}
			</p>

			<div className={s['owner-info']}>
				<div className={s['owner-avatar']}>
					{familyToJoin?.owner.avatarImageUrl ? (
						<Image
							src={familyToJoin.owner.avatarImageUrl}
							alt=''
						/>
					) : (
						familyToJoin?.owner.username.slice(0, 1).toUpperCase()
					)}
				</div>
				<span className={s['owner-name']}>
					{familyToJoin?.owner.username || t('general.loading')}
				</span>
			</div>
			<div className={s.options}>
				<button
					className={`${s.btn} ${s['btn-join']}`}
					onClick={() =>
						inviteId && acceptJoinInvite({ id: inviteId, connectFamily: true })
					}
				>
					{t('general.join')}
				</button>
				<button
					className={`${s.btn} ${s['btn-cancel']}`}
					onClick={cancel}
				>
					{t('general.cancel')}
				</button>
			</div>
		</div>
	)
}

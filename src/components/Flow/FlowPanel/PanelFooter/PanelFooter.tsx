'use client'

import { useFamily } from '@/hooks/family/useFamily'
import { useDeleteFamilyMember } from '@/hooks/familyMember/useDeleteFamilyMember'
import { useFamilyMember } from '@/hooks/familyMember/useFamilyMember'
import { useUser } from '@/hooks/user/useUser'
import { useLocalization } from '@/i18n'
import { useFlowStore } from '@/store/flow.store'
import { type FC } from 'react'
import s from './PanelFooter.module.scss'

export const PanelFooter: FC = () => {
	const selectedMemberId = useFlowStore(state => state.selectedMemberId)
	const setRelationAddingMenu = useFlowStore(
		state => state.setRelationAddingMenu,
	)
	const { data: member } = useFamilyMember(selectedMemberId)
	const { data: family } = useFamily()
	const { data: user } = useUser()

	const { mutate: deleteMember } = useDeleteFamilyMember()

	const { t } = useLocalization()

	const connectedToUser = family?.users?.find(
		user => user.familyMemberId === member?.id,
	)
	const isConnectedToUser = connectedToUser?.familyMemberId === member?.id

	return (
		<div className={s['panel-footer']}>
			<button
				disabled={!!member?.fatherId}
				onClick={() => setRelationAddingMenu('add-father')}
			>
				{t('flow.panel.footer.add-father')}
			</button>
			<button
				disabled={!!member?.motherId}
				onClick={() => setRelationAddingMenu('add-mother')}
			>
				{t('flow.panel.footer.add-mother')}
			</button>

			{member?.gender === 'MALE' ? (
				<>
					<button
						disabled={!!member?.wife?.id}
						onClick={() => setRelationAddingMenu('add-wife')}
					>
						{t('flow.panel.footer.add-wife')}
					</button>
					<button onClick={() => setRelationAddingMenu('add-ex-wife')}>
						{t('flow.panel.footer.add-ex-wife')}
					</button>
				</>
			) : (
				<>
					<button
						disabled={!!member?.husband?.id}
						onClick={() => setRelationAddingMenu('add-husband')}
					>
						{t('flow.panel.footer.add-husband')}
					</button>
					<button onClick={() => setRelationAddingMenu('add-ex-husband')}>
						{t('flow.panel.footer.add-ex-husband')}
					</button>
				</>
			)}

			<button onClick={() => setRelationAddingMenu('add-son')}>
				{t('flow.panel.footer.add-son')}
			</button>
			<button onClick={() => setRelationAddingMenu('add-daughter')}>
				{t('flow.panel.footer.add-daughter')}
			</button>
			<button
				onClick={() => {
					if (member?.id) deleteMember(member.id)
				}}
				disabled={!!connectedToUser?.id && connectedToUser.id !== user?.id}
			>
				{t(`flow.panel.footer.${isConnectedToUser ? 'disconnect' : 'remove'}`)}
			</button>
		</div>
	)
}

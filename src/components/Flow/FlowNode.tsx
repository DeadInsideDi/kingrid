'use client'

import { useFamily } from '@/hooks/family/useFamily'
import { useFamilyMember } from '@/hooks/familyMember/useFamilyMember'
import { useLocalization } from '@/i18n'
import { familyInvitationService } from '@/services/family-invitation.service'
import { useFlowStore } from '@/store/flow.store'
import type { FamilyResponse } from '@/types/family.types'
import type { TypeId } from '@/types/root.types'
import { getAge } from '@/utils/date.utils'
import { Loader } from 'lucide-react'
import { type FC, type MouseEvent } from 'react'
import { toast } from 'sonner'
import { connectionManager } from './connectionManager'
import s from './styles.module.scss'

const handleHovering = (e: MouseEvent) =>
	connectionManager.toggleAnimateConnectionForNode(e.currentTarget!.id)

const isMemberConncectedToUser = (
	memberId: TypeId,
	family: FamilyResponse | null,
) => {
	if (!family) return false
	return family.users.some(user => user.familyMemberId === memberId)
}

const ConnectedUserButton: FC<{ id: TypeId }> = ({ id }) => {
	const { data: family } = useFamily()

	const memberWidth = useFlowStore(state => state.memberWidth)
	const memberHeight = useFlowStore(state => state.memberHeight)
	const invitePopupIsLoading = useFlowStore(state => state.invitePopupIsLoading)
	const { setInvitePopupId, setInvitePopupIsOpen, setInvitePopupIsLoading } =
		useFlowStore.getState()

	const { t } = useLocalization()

	const isConnected = isMemberConncectedToUser(id, family || null)

	const handleClick = async () => {
		if (isConnected || invitePopupIsLoading) return

		setInvitePopupIsLoading(true)
		try {
			const response = await familyInvitationService.createFamilyInvitation({
				familyMemberId: id,
			})
			const newInviteId = response.data
			setInvitePopupId(newInviteId)
			setInvitePopupIsOpen(true)
		} catch {
			toast.error(t('toast.error.failed-to-create-invitation'))
		} finally {
			setInvitePopupIsLoading(false)
		}
	}

	return (
		<foreignObject
			x={memberWidth - 40}
			y={memberHeight - 40}
			width={32}
			height={32}
		>
			<button
				className={s['connected-user-button']}
				disabled={isConnected || invitePopupIsLoading}
				onClick={handleClick}
				title={t(
					`flow.node.button.title.${
						isConnected
							? 'connected'
							: invitePopupIsLoading
								? 'connecting'
								: 'connect'
					}`,
				)}
			>
				{invitePopupIsLoading && !isConnected ? (
					<Loader className={s.loader} />
				) : (
					<svg>
						<use href={isConnected ? '#n-connected' : '#n-connect'} />
					</svg>
				)}
			</button>
		</foreignObject>
	)
}

export type FlowNodeProps = {
	id: TypeId
	x: number
	y: number
	title: string
}

export const FlowNode: FC<FlowNodeProps> = ({ id, x, y, title }) => {
	const { data: member } = useFamilyMember(id)
	const selectedMemberId = useFlowStore(state => state.selectedMemberId)
	const setSelectedMemberId = useFlowStore(state => state.setSelectedMemberId)
	const memberWidth = useFlowStore(state => state.memberWidth)

	if (!member) return null
	const memberAge = getAge(member.birthDate, member.deathDate)

	return (
		<g
			id={id}
			transform={`translate(${x},${y})`}
			onMouseDown={e => {
				e.currentTarget!.ownerSVGElement!.dataset.isDraggingId = id
				setSelectedMemberId(id)
			}}
			onMouseEnter={handleHovering}
			onMouseLeave={handleHovering}
			className={selectedMemberId === id ? s['selected-node'] : ''}
		>
			<title>{title}</title>
			<use href='#n-rect' />

			{member.avatarImageUrl ? (
				<image
					href={member.avatarImageUrl}
					x='10'
					y='10'
					width='50'
					height='50'
					clipPath='url(#n-avatar-image)'
				/>
			) : (
				<use
					href={
						member.gender === 'MALE' ? '#n-male-avatar' : '#n-female-avatar'
					}
				/>
			)}

			<use
				href={member.gender === 'MALE' ? '#n-male-gender' : '#n-female-gender'}
				x='23'
				y='65'
			/>

			{[member.lastName, member.firstName, member.middleName]
				.filter(Boolean)
				.map((name, index) => (
					<text
						key={index}
						x='65'
						y={(index + 1) * 25}
					>
						{name}
					</text>
				))}

			{
				<text
					x={memberWidth - 10}
					y='25'
					textAnchor='end'
					style={memberAge ? {} : { fill: 'var(--grey-600)' }}
				>
					{memberAge}
				</text>
			}

			<ConnectedUserButton id={id} />
		</g>
	)
}

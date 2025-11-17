'use client'

import { useEffect, useRef, type FC } from 'react'
import { FlowBackground } from './FlowBackground'
import { FlowNode } from './FlowNode'

import { useFamilyRelations } from '@/hooks/family/useFamilyRelations'
import { useFlowStore } from '@/store/flow.store'
import {
	scaleRelativeWithCursor,
	translateNode,
	translateRelative,
	translateToCenter,
} from '../../utils/flow.utils'
import { connectionManager } from './connectionManager'

export const FlowContainer: FC = () => {
	const connectionsRef = useRef<SVGGElement>(null)
	const schema = useFlowStore(state => state.schema)
	const memberWidth = useFlowStore(state => state.memberWidth)
	const memberHeight = useFlowStore(state => state.memberHeight)
	const strokeWidth = useFlowStore(state => state.strokeWidth)

	const defaultMaleAvatarImageUrl = useFlowStore(
		state => state.defaultMaleAvatarImageUrl,
	)
	const defaultFemaleAvatarImageUrl = useFlowStore(
		state => state.defaultFemaleAvatarImageUrl,
	)

	const { data: relations } = useFamilyRelations()

	useEffect(() => {
		if (!connectionsRef.current) return
		connectionManager.init({ members: schema?.members || [] })
	}, [schema?.members])

	useEffect(() => {
		if (!schema?.members.length) return
		translateToCenter()
	}, [schema?.members.length])

	const onMouseMove = (e: React.MouseEvent) => {
		const target = e.currentTarget as SVGGElement
		const { isDraggingId } = target.dataset
		if (isDraggingId) translateNode(isDraggingId, e.movementX, e.movementY)
		else if (e.buttons) translateRelative(e.movementX, e.movementY)
	}

	const onWheel = (e: React.WheelEvent) => {
		const { deltaY, clientX, clientY, currentTarget } = e
		scaleRelativeWithCursor(
			deltaY,
			clientX,
			clientY,
			currentTarget as SVGSVGElement,
		)
	}

	return (
		<svg
			ref={schema?.ref}
			onMouseMove={onMouseMove}
			onWheel={onWheel}
		>
			<defs>
				<rect
					id='n-rect'
					width={memberWidth}
					height={memberHeight}
					rx='10'
				/>
				<clipPath id='n-avatar-image'>
					<circle
						cx='35'
						cy='35'
						r='25'
					/>
				</clipPath>
				<image
					id='n-male-avatar'
					href={defaultMaleAvatarImageUrl}
					x='10'
					y='10'
					width='50'
					height='50'
					clipPath='url(#n-avatar-image)'
				/>
				<image
					id='n-female-avatar'
					href={defaultFemaleAvatarImageUrl}
					x='10'
					y='10'
					width='50'
					height='50'
					clipPath='url(#n-avatar-image)'
				/>
				<path
					id='n-male-gender'
					d='m10 22a1 1 0 000-14 1 1 0 000 14m5-12 8-8M15 2h8m0 8V2'
					stroke='#2986cc'
					strokeWidth='2'
					strokeLinecap='round'
					fill='#0000'
				/>
				<path
					id='n-female-gender'
					d='m12 15a1 1 0 000-14 1 1 0 000 14v8m-4-4h8'
					stroke='#c90076'
					strokeWidth='2'
					strokeLinecap='round'
					fill='#0000'
				/>
				<path
					id='n-connect'
					d='m2 21a8 8 0 0113-6m-5-2a1 1 0 000-10 1 1 0 000 10m6 6h6m-3-3v6'
					stroke='var(--off-fg-color)'
					strokeWidth='2'
					strokeLinecap='round'
					fill='#0000'
				/>
				<path
					id='n-connected'
					d='m2 21a8 8 0 0113-6m-5-2a1 1 0 000-10 1 1 0 000 10m6 6 2 2 4-4'
					stroke='var(--primary-color)'
					strokeWidth='2'
					strokeLinecap='round'
					fill='#0000'
				/>
			</defs>
			<FlowBackground />
			<g id='nodes'>
				<g
					ref={connectionsRef}
					id='connections'
					style={{ strokeWidth }}
				/>
				{schema?.members.map(member => (
					<FlowNode
						key={member.id}
						title={relations?.[member.id] || ''}
						{...member}
					/>
				))}
			</g>
		</svg>
	)
}

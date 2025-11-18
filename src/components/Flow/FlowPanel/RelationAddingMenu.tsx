'use client'

import { useAddMemberToFamily } from '@/hooks/family/useAddMemberToFamily'
import { useFamilyMember } from '@/hooks/familyMember/useFamilyMember'
import { useLocalization } from '@/i18n'
import type { TranslationKey } from '@/i18n/types/translation.types'
import { useFlowStore } from '@/store/flow.store'
import type { TypeId } from '@/types/root.types'
import { addRelationByType } from '@/utils/relations.utils'
import { useEffect, useState, type FC } from 'react'
import s from './FlowPanel.module.scss'
import { PanelHeader } from './PanelHeader/PanelHeader'

export const RelationSuggester: FC = () => {
	const selectedMemberId = useFlowStore(state => state.selectedMemberId)
	const { data: member } = useFamilyMember(selectedMemberId)

	const relationAddingMenu = useFlowStore(state => state.relationAddingMenu)
	const setRelationAddingMenu = useFlowStore(
		state => state.setRelationAddingMenu,
	)
	const [checkedValue, setCheckedValue] = useState('')
	const [relation, setRelation] = useState('')

	const { mutate } = useAddMemberToFamily()

	const { t } = useLocalization()

	useEffect(
		() => setRelationAddingMenu('none'),
		[selectedMemberId, setRelationAddingMenu],
	)

	useEffect(() => {
		if (relationAddingMenu === 'none') return setCheckedValue('')
		const rel = relationAddingMenu.slice(relationAddingMenu.indexOf('-') + 1)

		setRelation(rel)
		if (!checkedValue) setCheckedValue('new')
	}, [checkedValue, relationAddingMenu])

	if (relationAddingMenu === 'none') return null

	const close = () => setRelationAddingMenu('none')

	const getRelationList = () => {
		const relationList: [string, TypeId][] = [[relation, 'new']]
		if (member) {
			const { schema, memberGenerations } = useFlowStore.getState()
			if (!schema || memberGenerations?.[member.id] === undefined)
				return relationList

			let generation = memberGenerations[member.id]
			if (
				relationAddingMenu === 'add-father' ||
				relationAddingMenu === 'add-mother'
			)
				generation--
			else if (
				relationAddingMenu === 'add-son' ||
				relationAddingMenu === 'add-daughter'
			)
				generation++

			const gender =
				relationAddingMenu === 'add-father' ||
				relationAddingMenu.includes('husband') ||
				relationAddingMenu === 'add-son'
					? 'MALE'
					: 'FEMALE'
			for (const [id, memberGeneration] of Object.entries(memberGenerations)) {
				if (memberGeneration !== generation) continue

				const suggestedMember = schema.members.find(m => m.id === id)
				if (!suggestedMember || suggestedMember.gender !== gender) continue

				if (
					relationAddingMenu === 'add-son' ||
					relationAddingMenu === 'add-daughter'
				) {
					const members = [suggestedMember]
					const spouseId =
						suggestedMember.husband?.id || suggestedMember.wife?.id
					const spouse = schema.members.find(m => m.id === spouseId)
					if (spouse) members.push(spouse)
					if (
						members.some(
							m => m?.fatherId === member.id || m?.motherId === member.id,
						)
					)
						continue
				}

				if (relationAddingMenu.includes('ex')) {
					const ids: TypeId[] = []
					member.wifeFormers.forEach(el => ids.push(el.formerHusbandId))
					member.husbandFormers.forEach(el => ids.push(el.formerWifeId))
					if (ids.includes(suggestedMember.id)) continue
				}

				if (
					(relationAddingMenu.includes('husband') ||
						relationAddingMenu.includes('wife')) &&
					(suggestedMember.husband?.id || suggestedMember.wife?.id)
				)
					continue

				relationList.push([suggestedMember.firstName, id])
			}
		}
		return relationList
	}

	return (
		<div
			className={s['relation-suggester']}
			role='radiogroup'
		>
			{getRelationList().map(([name, id]) => (
				<label key={id}>
					<input
						checked={checkedValue === id}
						value={id}
						onChange={e => setCheckedValue(e.currentTarget.value)}
						type='radio'
						name='relation-radio'
					/>

					<span>
						{t('flow.panel.add')}{' '}
						{name === relation ? (
							t('flow.panel.new')
						) : (
							<>
								<b>{name}</b> {t('flow.panel.as')}
							</>
						)}
						{t(`flow.panel.relations.${relation}` as TranslationKey)}
					</span>
				</label>
			))}
			<div className={s['suggester-buttons']}>
				<button onClick={close}>{t('general.cancel')}</button>
				<button
					onClick={async () => {
						console.log('clicked')
						if (!member) return
						console.log('member', member)

						const addRelation = addRelationByType[relationAddingMenu]
						const isNew = checkedValue === 'new'
						console.log('addRelation', addRelation, 'isNew', isNew)
						const newMemberId = await addRelation({
							fromMember: member,
							memberId: checkedValue,
							isNew,
							t,
						})
						console.log('newMemberId', newMemberId)

						if (newMemberId) {
							mutate({
								newMemberId,
								isNew,
								fromMemberId: member.id,
								relationAddingMenu,
							})
						}
						close()
					}}
				>
					{t('flow.panel.add')}
				</button>
			</div>
		</div>
	)
}

export const RelationAddingMenu: FC = () => {
	const panelWidth = useFlowStore(state => state.panelWidth)
	const relationAddingMenu = useFlowStore(state => state.relationAddingMenu)
	const setRelationAddingMenu = useFlowStore(
		state => state.setRelationAddingMenu,
	)
	const relationAddingMenuIsOpen = relationAddingMenu !== 'none'

	return (
		<dialog
			className={s['relation-adding-menu']}
			style={{ width: panelWidth }}
			open={relationAddingMenuIsOpen}
			aria-modal
		>
			<PanelHeader onClose={() => setRelationAddingMenu('none')} />
			<RelationSuggester />
		</dialog>
	)
}

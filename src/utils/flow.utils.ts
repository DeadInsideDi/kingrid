import { useFlowStore } from '@/store/flow.store'
import type { TypeId } from '@/types/root.types'

import type { BaseUserResponse } from '@/types/auth.types'
import type { FamilyMemberResponse } from '@/types/family-member.types'
import type { FamilyResponse } from '@/types/family.types'
import { useEffect } from 'react'
import { connectionManager } from '../components/Flow/connectionManager'

export const SVG_TRANSLATE_ITEM = 0
export const SVG_SCALE_ITEM = 1

export const SENSITIVITY_SCALE = 0.9
export const MIN_SCALE = 0.05
export const MAX_SCALE = 5

export const clampScale = (value: number) =>
	Math.max(Math.min(value, MAX_SCALE), MIN_SCALE)

export const calcScale = (old: number, delta: number) =>
	+clampScale(old * SENSITIVITY_SCALE ** Math.sign(delta)).toFixed(2)

export const getNodesGroup = () =>
	document.getElementById('nodes') as SVGGElement | null

export const getFlowSvg = () => getNodesGroup()?.ownerSVGElement

export const getTransformList = () => getNodesGroup()?.transform.baseVal

export const getTranslateItem = () => {
	const transformList = getTransformList()
	if (!transformList || transformList.numberOfItems < 1) return null
	return transformList.getItem(SVG_TRANSLATE_ITEM)
}

export const getScaleItem = () => {
	const transformList = getTransformList()
	if (!transformList || transformList.numberOfItems < 2) return null
	return transformList.getItem(SVG_SCALE_ITEM)
}

export const getCurrentScale = () => getScaleItem()?.matrix.a

export const useFlowInit = () => {
	useEffect(() => {
		const nodes = getNodesGroup()
		if (!nodes) return

		const transformList = nodes.transform.baseVal
		if (transformList.numberOfItems === 0) {
			transformList.appendItem(nodes.ownerSVGElement!.createSVGTransform())
			transformList.appendItem(nodes.ownerSVGElement!.createSVGTransform())
		}

		const handleMouseUp = () => {
			delete nodes.ownerSVGElement!.dataset.isDraggingId
		}

		window.addEventListener('mouseup', handleMouseUp)
		return () => {
			window.removeEventListener('mouseup', handleMouseUp)
		}
	}, [])

	return {}
}

export const translateAbsolute = (x: number, y: number) =>
	getTranslateItem()?.setTranslate(x, y)

export const translateRelative = (offsetX: number, offsetY: number) => {
	const translate = getTranslateItem()
	if (!translate) return
	const { e: x, f: y } = translate.matrix
	translate.setTranslate(x + offsetX, y + offsetY)
}

export const translateToCenter = () => {
	const nodes = getNodesGroup()
	if (!nodes) return
	const { clientWidth, clientHeight } = nodes.ownerSVGElement!
	const { x, y } = nodes.getBBox()
	const { width, height } = nodes.getBoundingClientRect()
	const { panelIsOpen, panelWidth } = useFlowStore.getState()
	const scale = getCurrentScale() || 1

	translateAbsolute(
		(clientWidth - width + +panelIsOpen * panelWidth) / 2 - x * scale,
		(clientHeight - height) / 2 - y * scale,
	)
}

export const translateNode = (id: TypeId, offsetX: number, offsetY: number) => {
	const node = document.getElementById(id) as SVGGElement | null
	if (!node) return

	const scale = getCurrentScale() || 1
	const [x, y] = node.getAttribute('transform')!.slice(10, -1).split(',')

	node.setAttribute(
		'transform',
		`translate(${+x + offsetX / scale},${+y + offsetY / scale})`,
	)

	connectionManager.updateConnectionForNode(node.id)
}

export const scaleAbsolute = (scaleX: number, scaleY: number = scaleX) => {
	const setScalePercents = useFlowStore.getState().setScalePercents
	const scaleItem = getScaleItem()
	if (!scaleItem) return

	scaleItem.setScale(clampScale(scaleX), clampScale(scaleY))
	setScalePercents(~~(scaleX * 100))
}

export const scaleRelative = (delta: number) => {
	const setScalePercents = useFlowStore.getState().setScalePercents
	const scaleItem = getScaleItem()
	if (!scaleItem) return

	const { a: oldScale } = scaleItem.matrix
	const newScale = calcScale(oldScale, delta)

	scaleItem.setScale(newScale, newScale)
	setScalePercents(~~(newScale * 100))

	return { oldScale, newScale }
}

export const getSVGPoint = (flowSvg: SVGSVGElement, x: number, y: number) => {
	const pt = flowSvg.createSVGPoint()
	pt.x = x
	pt.y = y
	return pt.matrixTransform(flowSvg.getScreenCTM()?.inverse())
}

export const scaleRelativeWithCursor = (
	scaleDelta: number,
	cursorX: number,
	cursorY: number,
	flowSvg: SVGSVGElement,
) => {
	if (!getScaleItem()) return

	const { newScale, oldScale } = scaleRelative(scaleDelta)!
	const scaleRatio = newScale / oldScale

	const translate = getTranslateItem()!
	const { e: oldX, f: oldY } = translate.matrix
	const { x, y } = getSVGPoint(flowSvg, cursorX, cursorY)

	translate.setTranslate(
		x - (x - oldX) * scaleRatio,
		y - (y - oldY) * scaleRatio,
	)
}

export const zoomStep = (node: 'in' | 'out') => {
	const svg = getFlowSvg()
	if (!svg) return

	const { width, height } = svg.getBoundingClientRect()
	const { panelIsOpen, panelWidth } = useFlowStore.getState()
	const delta = node === 'in' ? -100 : 100

	scaleRelativeWithCursor(
		delta,
		(width + +panelIsOpen * panelWidth) / 2,
		height / 2,
		svg,
	)
}

export const zoomReset = () => {
	const svg = getFlowSvg()
	if (!svg) return

	const { width, height } = svg.getBoundingClientRect()
	const { panelIsOpen, panelWidth } = useFlowStore.getState()

	const scaleItem = getScaleItem()
	if (!scaleItem) return

	const scaleRatio = 1 / scaleItem.matrix.a
	scaleAbsolute(1)

	const { e: oldX, f: oldY } = getTranslateItem()!.matrix
	const { x, y } = getSVGPoint(
		svg,
		(width + +panelIsOpen * panelWidth) / 2,
		height / 2,
	)
	translateAbsolute(x - (x - oldX) * scaleRatio, y - (y - oldY) * scaleRatio)
}

const processDate = (date: string | Date) => new Date(date).toLocaleString()

const processUser = (user: BaseUserResponse) => {
	const data: Record<string, string> = {
		id: user.id,
		name: user.username,
	}
	if (user.familyMemberId) data.member = user.familyMemberId
	return data
}

const processMember = (member: FamilyMemberResponse) => {
	const data: Record<string, string | string[]> = {
		id: member.id,
		name: [member.firstName, member.middleName].join(' ').trim(),
		gender: member.gender,
		birthDate: processDate(member.birthDate),
		created: processDate(member.createdAt),
		updated: processDate(member.updatedAt),
	}

	if (member.lastName) data.surname = member.lastName.trim()
	if (member.birthPlace) data.birthPlace = member.birthPlace.trim()
	if (member.deathDate) data.deathDate = processDate(member.deathDate)
	if (member.avatarImageUrl) data.avatar = member.avatarImageUrl
	if (member.imageUrls.length) data.images = member.imageUrls
	if (member.description) data.description = member.description.trim()

	if (member.fatherId) data.father = member.fatherId
	if (member.motherId) data.mother = member.motherId
	if (member.husband?.id) data.husband = member.husband.id
	if (member.wife?.id) data.wife = member.wife.id
	if (member.husbandFormers.length)
		data.husbandFormers = member.husbandFormers.map(el => el.formerWifeId)
	if (member.wifeFormers.length)
		data.wifeFormers = member.wifeFormers.map(el => el.formerHusbandId)

	return data
}

export const exportTree = (family: FamilyResponse | undefined) => {
	if (!family) return

	const familyData = {
		name: family.name,
		owner: family.ownerId,
		members: family.familyMembers.map(processMember),
		users: family.users.map(processUser),
		created: processDate(family.createdAt),
		updated: processDate(family.updatedAt),
	}

	const text = JSON.stringify(familyData, null, 2)
	const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
	const url = URL.createObjectURL(blob)

	const a = document.createElement('a')
	a.setAttribute('download', `${family.name}.json`)
	a.setAttribute('href', url)
	a.setAttribute('target', '_blank')
	a.click()
}

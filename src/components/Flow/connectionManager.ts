import { useFlowStore } from '@/store/flow.store'
import type {
	Connection,
	ConnectionType,
	MemberWithPos,
	NodePosition,
} from '@/types/flow.types'
import type { TypeId } from '@/types/root.types'
import s from './styles.module.scss'

export const SVG_LINK = 'http://www.w3.org/2000/svg'

export const getNodePositionById = (
	id: TypeId,
	connectionType: ConnectionType,
	isFrom: boolean,
) => {
	const node = document.getElementById(id) as SVGGElement | null
	const { strokeWidth, memberWidth, memberHeight } = useFlowStore.getState()

	const { width, height } = node
		? node.getBBox()
		: { width: memberWidth, height: memberHeight }

	const [x, y] = node
		? node.getAttribute('transform')!.slice(10, -1).split(',')
		: connectionManager.memberCenterPositions?.[id] || [0, 0]

	const pos = { x: ~~x, y: ~~y } // Top Left

	if (connectionType === 'lineage') {
		pos.x += ~~width / 2
		pos.y += (~~height - strokeWidth) * +!isFrom + strokeWidth / 2
	} else if (connectionType.includes('spouse')) {
		pos.y += ~~height / 2
		pos.x += (~~width - strokeWidth) * +isFrom + strokeWidth / 2
	}
	if (connectionType === 'ex-spouse') pos.y -= ~~height / 4

	return pos
}

export const createBezierPath = (
	{ x: x0, y: y0 }: NodePosition,
	{ x: x1, y: y1 }: NodePosition,
) => {
	const dx = x1 - x0
	const dy = y1 - y0
	const r = Math.min(Math.abs(dx), Math.abs(dy)) / 2
	const rx = r * Math.sign(dx)
	const ry = r * Math.sign(dy)

	return `M${x0} ${y0}V${y1 - ry * 2}q0 ${ry},${rx} ${ry}h${(Math.abs(dx) - Math.abs(rx) * 2) * Math.sign(dx)}q${rx} 0,${rx} ${ry}`
}

export class ConnectionManager {
	private connections: Connection[] = []
	memberCenterPositions: Record<TypeId, [number, number]> = {}
	connectionGroup: SVGGElement | null = null

	init({ members }: { members: MemberWithPos[] }) {
		if (!members.length) return
		if (this.connectionGroup && this.connections.length) return

		this.connectionGroup = document.getElementById(
			'connections',
		) as SVGGElement | null

		if (!this.connectionGroup) return

		this.memberCenterPositions = members.reduce(
			(acc, { id, x, y }) => {
				acc[id] = [x, y]
				return acc
			},
			{} as Record<TypeId, [number, number]>,
		)

		members.forEach(({ id, ...member }) => {
			if (member.fatherId) this.addConnection(member.fatherId, id, 'lineage')
			if (member.motherId) this.addConnection(member.motherId, id, 'lineage')
			if (member.wife?.id) this.addConnection(member.wife.id, id, 'spouse')
			if (member.husbandFormers?.length)
				member.husbandFormers.forEach(member =>
					this.addConnection(member.formerWifeId, id, 'ex-spouse'),
				)
		})
	}

	private updatePath({ fromId, toId, connectionType, path }: Connection) {
		const [fromNodePos, toNodePos] = [fromId, toId].map((id, i) =>
			getNodePositionById(id, connectionType, !!i),
		)
		path.setAttribute('d', createBezierPath(fromNodePos, toNodePos))
	}

	appendToConnectionGroup(node: SVGElement) {
		this.connectionGroup!.appendChild(node)
	}
	removeFromConnectionGroup(node: SVGElement) {
		this.connectionGroup!.removeChild(node)
	}

	addConnection(fromId: TypeId, toId: TypeId, connectionType: ConnectionType) {
		const path = document.createElementNS(SVG_LINK, 'path')
		const connection = { fromId, toId, connectionType, path }

		path.setAttribute(
			'class',
			[s['path'], s[`${connectionType}-path`]].join(' '),
		)
		path.onmouseenter = () => {
			connectionAnimationManager.requestRaisePath(this.connectionGroup!, path)
			connectionAnimationManager.startCircleAnimation(path)
		}
		path.onmouseleave = () => {
			connectionAnimationManager.stopCircleAnimation(path)
		}

		this.appendToConnectionGroup(path)
		this.connections.push(connection)
		this.updatePath(connection)
	}

	getConnectionsById(id: TypeId) {
		return this.connections.filter(
			({ fromId, toId }) => id === fromId || id === toId,
		)
	}

	updateConnectionForNode(id: TypeId) {
		this.getConnectionsById(id).forEach(connection =>
			this.updatePath(connection),
		)
	}

	updateAllConnections() {
		this.connections.forEach(connection => this.updatePath(connection))
	}

	toggleAnimateConnectionForNode(id: TypeId) {
		this.getConnectionsById(id).forEach(connection =>
			connection.path.classList.toggle(s['path-animate']),
		)
	}

	deleteConnectionsById(id: TypeId) {
		this.getConnectionsById(id).forEach(connection =>
			this.removeFromConnectionGroup(connection.path),
		)
	}

	deleteAllConnections() {
		if (!this.connectionGroup) return
		this.connectionGroup.innerHTML = ''
		this.connections = []
	}
}

export const connectionManager = new ConnectionManager()

export class ConnectionAnimationManager {
	circle: SVGCircleElement

	constructor() {
		this.circle = document.createElementNS(SVG_LINK, 'circle')
	}

	requestRaisePath(connectionGroup: SVGGElement, path: SVGPathElement) {
		if (connectionGroup!.lastChild === path) return
		connectionManager.removeFromConnectionGroup(path)
		connectionManager.appendToConnectionGroup(path)
	}

	startCircleAnimation(path: SVGPathElement) {
		path.setAttribute('id', 'n-path:hover')
		connectionManager.appendToConnectionGroup(this.circle)
	}

	stopCircleAnimation(path: SVGPathElement) {
		path.removeAttribute('id')
		connectionManager.removeFromConnectionGroup(this.circle)
	}
}

export const connectionAnimationManager = new ConnectionAnimationManager()

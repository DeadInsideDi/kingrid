import type { FamilyMemberResponse } from './family-member.types'
import type { TypeId } from './root.types'

export type NodePosition = { x: number; y: number }

export type ConnectionType = 'lineage' | 'spouse' | 'ex-spouse'

export type Connection = {
	fromId: TypeId
	toId: TypeId
	connectionType: ConnectionType
	path: SVGPathElement
}

export type MemberWithPos = FamilyMemberResponse & NodePosition

export type SchemaProps = {
	members: FamilyMemberResponse[]
}

export type SchemaType = {
	members: MemberWithPos[]
	ref: React.RefObject<SVGSVGElement | null>
}

export type TreeFamilyItem = {
	members: FamilyMemberResponse[]
	generation: number
}

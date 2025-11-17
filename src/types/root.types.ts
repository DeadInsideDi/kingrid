export type TypeId = string

export interface IBaseTimestamps {
	createdAt: string
	updatedAt: string
}

export type OnlyIdResponse = {
	id: TypeId
}

export type IBase = OnlyIdResponse & IBaseTimestamps

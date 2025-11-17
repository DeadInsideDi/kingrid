import type { IBase, TypeId } from './root.types'

export interface AuthForm {
	authId: string
	password: string
}

export interface AuthUniqueFields {
	email?: string
	username?: string
	phone?: string
}

export interface AuthPayload extends AuthUniqueFields {
	password: string
}

export interface AuthActivationPayload {
	token: string
	code: string
}

export interface AuthActivatedResponse {
	id: TypeId
	accessToken: string
}

export interface AuthNotActivatedResponse {
	id: null
	activationToken: string
}

export type AuthResponse = AuthActivatedResponse | AuthNotActivatedResponse

// User

export interface BaseUserResponse {
	id: TypeId
	username: string
	familyMemberId: TypeId | null
}

export interface UserResponse extends BaseUserResponse, IBase {
	email: string | null
	phone: string | null
	avatarImageUrl: string | null
	familyId: TypeId | null
}

export type UserUpdatePayload = Partial<AuthPayload>

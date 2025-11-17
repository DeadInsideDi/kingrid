export type Styles = {
	btn: string
	'btn-cancel': string
	'btn-logout': string
	'fade-in': string
	icon: string
	logout: string
	message: string
	options: string
	pulse: string
	'security-note': string
	title: string
	'user-avatar': string
	'user-details': string
	'user-email': string
	'user-info': string
	'user-name': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles

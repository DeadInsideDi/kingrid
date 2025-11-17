export type Styles = {
	btn: string
	'btn-cancel': string
	'btn-join': string
	'fade-in': string
	'join-confirm': string
	message: string
	options: string
	'owner-avatar': string
	'owner-info': string
	'owner-name': string
	title: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles

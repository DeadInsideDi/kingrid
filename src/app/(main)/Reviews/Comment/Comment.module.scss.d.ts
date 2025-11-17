export type Styles = {
	comment: string
	date: string
	name: string
	occupation: string
	'user-info': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles

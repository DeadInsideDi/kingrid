export type Styles = {
	close: string
	form: string
	header: string
	modal: string
	'slide-in': string
	'slide-out': string
	submit: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles

export type Styles = {
	'close-button': string
	content: string
	'copy-button': string
	overlay: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles

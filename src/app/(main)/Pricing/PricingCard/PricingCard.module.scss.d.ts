export type Styles = {
	price: string
	'pricing-card': string
	'primary-card': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles

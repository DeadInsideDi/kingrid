export type Styles = {
	'app-actions': string
	header: string
	logo: string
	'mobile-menu': string
	navigation: string
	'slide-down': string
	'slide-right': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles

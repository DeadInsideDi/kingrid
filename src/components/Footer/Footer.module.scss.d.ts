export type Styles = {
	footer: string
	'footer-navbar': string
	'footer-rights': string
	jump: string
	'newsletter-form': string
	'newsletter-subtitle': string
	'newsletter-title': string
	'social-contacts': string
	'social-links': string
	'social-subtitle': string
	'social-title': string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles

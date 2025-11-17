import { AppWrapper } from '@/components/app-wrapper'
import { TanstackProvider } from '@/components/providers/tanstack-provider'
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants'

import { TranslationProvider } from '@/i18n'
import type { Metadata } from 'next'
import { Geist_Mono, Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.scss'

const roboto = Roboto({
	variable: '--font-roboto',
	weight: ['400'],
	subsets: ['latin', 'cyrillic'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	weight: ['400'],
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	icons: {
		icon: 'icon.svg',
	},
	description: SITE_DESCRIPTION,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<AppWrapper>
			<body className={`${roboto.variable} ${geistMono.variable}`}>
				<TanstackProvider>
					<TranslationProvider>
						{children}
						<Toaster
							position='top-right'
							duration={2000}
							className='toaster'
							swipeDirections={['top', 'right', 'bottom', 'left']}
						/>
					</TranslationProvider>
				</TanstackProvider>
			</body>
		</AppWrapper>
	)
}

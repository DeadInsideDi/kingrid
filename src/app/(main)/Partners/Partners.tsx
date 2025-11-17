'use client'

import { useLocalization } from '@/i18n'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type FC } from 'react'
import { InfiniteMarquee } from '../../../components/ui/InfiniteMarquee/InfiniteMarquee'
import s from './Partners.module.scss'

const partners = [
	{ name: 'Dropbox', image: '/dropbox.webp' },
	{ name: 'Shop', image: '/shop.webp' },
	{ name: 'Shopify', image: '/shopify.png' },
	{ name: 'Spotify', image: '/spotify.webp' },
	{ name: 'Twitch', image: '/twitch.webp' },
	{ name: 'Uber', image: '/uber.webp' },
]

export const Partners: FC = () => {
	const { t } = useLocalization()

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: `.${s.partners}`,
				start: 'top 125%',
			},
		})
		tl.from(`.${s.partners}`, {
			y: '10rem',
			scale: 0.5,
			duration: 0.25,
			ease: 'power2.out',
		})

		return () => {
			tl.kill()
		}
	})

	return (
		<section className={s.partners}>
			<h2>{t('partners.title')}</h2>
			<p>{t('partners.description')}</p>
			<InfiniteMarquee items={partners} />
		</section>
	)
}

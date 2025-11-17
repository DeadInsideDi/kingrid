'use client'

import { useLocalization } from '@/i18n'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Boxes, Cpu, MonitorCheck, Wifi } from 'lucide-react'
import { type FC } from 'react'
import s from './Features.module.scss'

export const Features: FC = () => {
	const { t } = useLocalization()

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)

		const tl = gsap
			.timeline({
				scrollTrigger: {
					trigger: '.features',
					start: 'top 100%',
				},
			})
			.from('.features>h2, features>p', {
				y: '-12rem',
				scale: 0,
				duration: 0.5,
				ease: 'power2.out',
			})
			.from(`.${s['stack']}>div`, {
				y: '-4rem',
				scale: 0,
				rotate: 15,
				duration: 0.25,
				ease: 'power2.out',
			})

		return () => {
			tl.kill()
		}
	})

	return (
		<section
			className='features'
			aria-labelledby='features'
		>
			<h2 id='features'>{t('features.title')}</h2>
			<p>{t('features.description')}</p>
			<div className={s['stack']}>
				<div className={s['effortless-building']}>
					<div>
						<Boxes />
					</div>
					<h3>{t('features.effortless-building.title')}</h3>
					<p>{t('features.effortless-building.description')}</p>
				</div>
				<div className={s['online-connection']}>
					<div>
						<Wifi />
					</div>
					<h3>{t('features.online-connection.title')}</h3>
					<p>{t('features.online-connection.description')}</p>
				</div>
				<div className={s['many-tools']}>
					<div>
						<Cpu />
					</div>
					<h3>{t('features.many-tools.title')}</h3>
					<p>{t('features.many-tools.description')}</p>
				</div>
				<div className={s['user-friendly-interface']}>
					<div>
						<MonitorCheck />
					</div>
					<h3>{t('features.user-friendly-interface.title')}</h3>
					<p>{t('features.user-friendly-interface.description')}</p>
				</div>
			</div>
		</section>
	)
}

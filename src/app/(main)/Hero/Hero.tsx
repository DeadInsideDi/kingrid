'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useFamily } from '@/hooks/family/useFamily'
import { useUser } from '@/hooks/user/useUser'
import { useLocalization } from '@/i18n'
import buttonStyles from '@/shared/ui/button.module.scss'
import { useAuthTreeStore } from '@/store/auth-tree.store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter } from 'next/navigation'
import s from './Hero.module.scss'
import { TourCarousel } from './TourCarousel/TourCarousel'

export const Hero = () => {
	const setModalState = useAuthTreeStore(state => state.setModalState)
	const setIsOpen = useAuthTreeStore(state => state.setIsOpen)
	const { data: family } = useFamily()
	const { data: user } = useUser()
	const router = useRouter()
	const { t } = useLocalization()

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.hero',
				start: 'top 100%',
			},
		})
		tl.from('.hero', {
			scale: 0.75,
			opacity: 0,
			duration: 0.5,
			ease: 'power2.out',
		})
			.from(
				`.${s['get-started']}`,
				{
					rotation: 720,
					duration: 0.5,
					ease: 'power2.out',
				},
				'<',
			)
			.from(`.${s['get-started']}>button`, {
				width: '3.5rem',
				height: '3.5rem',
				color: 'transparent',
				duration: 0.25,
				ease: 'power2.out',
			})
			.to(
				`.${s['get-started']}>button`,
				{ color: '', width: '', height: '' },
				'>0.1',
			)
			.from('.hero>div li', {
				rotate: 15,
				y: 200,
				scale: 0,
				opacity: 0,
				duration: 0.25,
				ease: 'power2.out',
			})

		return () => {
			tl.kill()
		}
	})

	const onClickPrimary = () => {
		if (!user) return router.push(DASHBOARD_PAGES.SIGNUP)
		if (family) return router.push(DASHBOARD_PAGES.TREE)
		setModalState('create')
		setIsOpen(true)
	}
	const onClickSecondary = () => {
		if (!user) return router.push(DASHBOARD_PAGES.SIGNUP)
		setModalState('join')
		setIsOpen(true)
	}
	return (
		<section
			className='hero'
			aria-labelledby='home'
		>
			<h1 id='home'>{t('home.title')}</h1>
			<p>{t('home.description')}</p>
			<div className={s['get-started']}>
				<button
					className={`${buttonStyles.btn} ${buttonStyles.primary}`}
					onClick={onClickPrimary}
				>
					{t(`home.${family ? 'go' : 'create'}`)}
				</button>
				<button
					className={`${buttonStyles.btn} ${buttonStyles.secondary}`}
					title={t(`home.${family ? 'connect' : 'join'}-title`)}
					onClick={onClickSecondary}
				>
					{t(`home.${family ? 'connect' : 'join'}`)}
				</button>
			</div>
			<TourCarousel />
		</section>
	)
}

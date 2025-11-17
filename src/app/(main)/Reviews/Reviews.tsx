'use client'

import { useLocalization } from '@/i18n'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type FC } from 'react'
import { Comment, type CommentProps } from './Comment/Comment'
import s from './Reviews.module.scss'

const comments: CommentProps[] = [
	{
		avatar: '/man-1-avatar.jpg',
		name: 'Алексей Олегович',
		occupation: 'Владелец банка',
		date: '17.05.2024',
		comment:
			'Мне нужно было место, чтобы отслеживать всех участников семьи. Это идеально. Это гораздо больше, чем просто таблица. Это стало мемориалом памяти для нашей семьи. И тот факт, что он такой восхитительный, означает, что люди на самом деле хотят пользоваться им и обновлять. Это как настоящий семейный альбом!',
	},
	{
		avatar: '/man-2-avatar.jpg',
		name: 'John Smith',
		occupation: 'Software engineer',
		date: '04.06.2025',
		comment:
			"I'll be honest, I was dragged into this by my cousin. I thought it would be boring and complicated. I was wrong on both counts. It's incredibly intuitive—I was adding people and photos within minutes. I got totally sucked in for hours! Discovering how our surname has little branches all over the world is mind-blowing. It’s strangely addictive. I'm now the one bugging my relatives for old pictures!",
	},
	{
		avatar: '/woman-avatar.jpg',
		name: '静惠',
		occupation: '项目经理',
		date: '15.01.2025',
		comment:
			'在我们家，那些复杂的关系和辈分总是让我很困惑。但这个应用让一切都清晰了。它的互动功能是最出色的地方——我可以专注于我外公外婆这一支，看到老照片弹出来，还能把不相关的分支收起来，界面一下就清爽了。它用一种我能够理解的方式呈现信息。现在，我终于能理清我们家的故事了。',
	},
]

export const Reviews: FC = () => {
	const { t } = useLocalization()

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.reviews',
				start: 'top 100%',
			},
		})
		tl.from('.reviews>h2, reviews>p', {
			y: '-4rem',
			scale: 0,
			duration: 0.5,
			ease: 'power2.out',
		}).from(`.${s['comments']}>div`, {
			y: '-4rem',
			rotate: 15,
			scale: 0,
			duration: 0.25,
			ease: 'power2.out',
		})

		return () => {
			tl.kill()
		}
	})

	return (
		<section
			className='reviews'
			aria-labelledby='reviews'
		>
			<h2 id='reviews'>{t('reviews.title')}</h2>
			<p>{t('reviews.description')}</p>
			<div className={s['comments']}>
				{comments.map((comment, index) => (
					<Comment
						key={index}
						{...comment}
					/>
				))}
			</div>
		</section>
	)
}

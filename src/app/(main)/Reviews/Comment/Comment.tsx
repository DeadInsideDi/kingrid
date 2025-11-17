'use client'

import Image from 'next/image'
import { type FC } from 'react'
import s from './Comment.module.scss'

export type CommentProps = {
	avatar: string
	name: string
	occupation: string
	date: string
	comment: string
}

export const Comment: FC<CommentProps> = ({
	avatar,
	name,
	occupation,
	date,
	comment,
}) => {
	return (
		<div className={s.comment}>
			<div className={s['user-info']}>
				<Image
					src={avatar}
					alt='user-avatar'
					width={32}
					height={32}
				/>
				<span className={s['name']}>{name}</span>
				<span className={s['occupation']}>{occupation}</span>
				<span className={s['date']}>{date}</span>
			</div>

			<p>{comment}</p>
		</div>
	)
}

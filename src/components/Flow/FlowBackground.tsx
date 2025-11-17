'use client'

import { type FC } from 'react'

export const FlowBackground: FC = () => {
	return (
		<>
			<pattern
				id='n-grid'
				width='25'
				height='25'
				patternUnits='userSpaceOnUse'
			>
				<path
					d='M50 0L0 0 0 50'
					fill='none'
					stroke='#7e7e7e'
					strokeWidth='0.5'
				/>
			</pattern>
			<rect
				width='100%'
				height='100%'
				fill='url(#n-grid)'
			/>
		</>
	)
}

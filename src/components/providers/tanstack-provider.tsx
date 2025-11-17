'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type FC, type PropsWithChildren, useState } from 'react'

export const TanstackProvider: FC<PropsWithChildren> = ({ children }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 10 * 60 * 1000,
						refetchOnWindowFocus: false,
						retryDelay: 5000,
						retry: 1,
					},
				},
			}),
	)
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

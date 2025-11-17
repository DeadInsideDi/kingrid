import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

export const useShortcut = <T extends (event?: KeyboardEvent) => unknown>(
	codes: string[],
	callback: T,
) => {
	const callbackRef = useRef(callback)
	useLayoutEffect(() => {
		callbackRef.current = callback
	})

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const { altKey, ctrlKey, metaKey, target, code } = event
			const { tagName, isContentEditable } = target as HTMLElement

			if (tagName === 'INPUT' || tagName === 'TEXTAREA' || isContentEditable)
				return
			if (altKey || ctrlKey || metaKey) return
			if (codes.some(curCode => curCode === code)) {
				return callbackRef.current(event)
			}
		},
		[codes],
	)

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	return callbackRef.current
}

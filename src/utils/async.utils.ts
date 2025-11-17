import { useCallback, useEffect, useRef, useState } from 'react'

export const debounce = <T extends (...args: unknown[]) => void>(
	func: T,
	timeout = 300,
) => {
	let timer: NodeJS.Timeout
	return (...args: Parameters<T>) => {
		clearTimeout(timer)
		timer = setTimeout(() => func(...args), timeout)
	}
}

export const useDebouncedCallback = <T extends (...args: unknown[]) => unknown>(
	callback: T,
	delay: number,
): T => {
	const timeoutRef = useRef<NodeJS.Timeout>(null)

	const debouncedFunction = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
			timeoutRef.current = setTimeout(() => callback(...args), delay)
		},
		[callback, delay],
	)

	return debouncedFunction as T
}

export const useDebounce = <T>(value: T, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay)
		return () => clearTimeout(handler)
	}, [value, delay])
	return debouncedValue
}

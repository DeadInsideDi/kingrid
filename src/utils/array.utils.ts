export const partition = <T>(
	list: readonly T[],
	predicate: (item: T) => unknown,
): [T[], T[]] => {
	const falsy: T[] = []
	const truthy: T[] = []

	const { length } = list
	for (let i = 0; i < length; i++) {
		const item = list[i]
		if (predicate(item)) truthy.push(item)
		else falsy.push(item)
	}

	return [falsy, truthy]
}

export const findAndRemove = <T>(
	list: T[],
	predicate: (item: T) => unknown,
) => {
	const index = list.findIndex(predicate)
	return index === -1 ? undefined : list.splice(index, 1)[0]
}

export const findAllAndRemove = <T>(
	list: T[],
	predicate: (item: T) => unknown,
) => {
	const items: T[] = []
	let item: T | undefined
	while ((item = findAndRemove(list, predicate))) items.push(item)
	return items
}

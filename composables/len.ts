/**
 * A function that returns the length of an item.
 *
 * @param item - The item to get the length of.
 *
 * @see https://docs.python.org/3/library/functions.html#len
 *
 * @example
 * ```ts
 * useLen([1, 2, 3]) // 3
 *
 * useLen("hello") // 5
 *
 * useLen({ a: 1, b: 2 }) // 2
 *
 * useLen(new Set([1, 2, 3])) // 3
 *
 * useLen(new Map([["a", 1], ["b", 2]])) // 2
 *
 * useLen(1) // TypeError: useLen() argument must be a sequence or collection, not number
 *
 * useLen(null) // TypeError: useLen() argument must be a sequence or collection, not null
 * ```
 * @returns The length of the item.
 */
export function useLen<T>(item: T): number {
	if (item instanceof Map) return item.size

	if (item instanceof Set) return item.size

	if (item instanceof Object) return Object.keys(item).length

	if (item instanceof Array) return item.length

	if (typeof item === "string") return item.length

	throw new TypeError(`useLen() argument must be a sequence or collection, not ${useType(item)}`)
}

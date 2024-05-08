import type { useSlugOptions } from "./types"

/**
 * Returns a random slug.
 *
 * @param options - The options.
 * - `lower` - Whether to include lowercase letters. Defaults to `true`.
 * - `upper` - Whether to include uppercase letters. Defaults to `true`.
 * - `digits` - Whether to include digits. Defaults to `true`.
 * - `size` - The size of the slug. Defaults to `6`.
 * - `prefix` - The prefix to use.
 *
 * @example
 * ```ts
 * useSlug() // "BcDeF1"
 * useSlug({ lower: false }) // "E1F2G3"
 * useSlug({ upper: false }) // "a1b2c3"
 * useSlug({ digits: false }) // "aBcDeF"
 * useSlug({ size: 10 }) // "aBcDeFgHiJ"
 * useSlug({ prefix: "test" }) // "test-aBcDeF"
 * ```
 *
 * @returns A random slug.
 */
export function useSlug(options: useSlugOptions = {}): string {
	const { lower = true, upper = true, digits = true } = options

	let size = options.size || 6

	let chars = ""

	if (size <= 1) size = 2

	if (lower) chars += "abcdefghijklmnopqrstuvwxyz"

	if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	if (digits) chars += "0123456789"

	let slug = ""

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	for (const _ of useRange(size - 1)) slug += chars[Math.floor(Math.random() * chars.length)]

	return options.prefix ? `${options.prefix}-${slug}` : slug
}

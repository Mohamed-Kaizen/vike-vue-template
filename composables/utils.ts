import type { Dict, DateLike } from "./types"

export const browser = typeof window !== "undefined"

export const isWs = typeof WebSocket !== "undefined"

/**
 * Toggle between themes
 *
 * @param theme - The theme to toggle to
 *
 * @example
 * ```ts
 * useThemeToggle("dark")
 * ```
 */
export function useThemeToggle(theme: string) {
	if (document.documentElement.classList.contains(theme)) return

	document.documentElement.classList.remove(...THEMES)

	document.documentElement.classList.add(theme)
}

/**
 * Toggle between languages
 *
 * @param lang - The language to toggle to
 *
 * @example
 * ```ts
 * useLangToggle("en")
 * ```
 *
 */
export function useLangToggle(lang: string) {
	document.documentElement.setAttribute("lang", lang)

	document.documentElement.setAttribute("dir", RTL_LANGS.includes(lang) ? "rtl" : "ltr")
}

export function useFork<T>(list: T[], fn: (item: T) => boolean): [T[], T[]] {
	if (!list) return [[], []]
	return list.reduce(
		(acc, item) => {
			const [a, b] = acc
			if (fn(item)) {
				return [[...a, item], b]
			} else {
				return [a, [...b, item]]
			}
		},
		[[], []] as [T[], T[]],
	)
}

/**
 * Use to deserialize the response from form requests.
 *
 * @param result - The result to deserialize
 *
 * @example
 * ```ts
 * const data = useDeserialize(result)
 * ```
 *
 * @returns The deserialized data.
 */
export function useDeserialize(result: string) {
	const parsed = JSON.parse(result)

	if (parsed.data) {
		parsed.data = JSON.parse(parsed.data)
	}
	return parsed
}

/**
 * Send form requests.
 *
 * @param url - The url to send the request to
 *
 * @param data - The data to send
 *
 * @param options - The options to use
 * - `method` - The method to use. Default is `POST`
 *
 * @example
 * ```ts
 * const data = await useFormRequest("/api/posts", {
 *    title: "Hello World",
 * })
 * ```
 *
 * @returns The response.
 */
export async function useFormRequest(
	url: string,
	data: Dict,
	options: { method?: "POST" | "PUT" | "DELETE" | "GET" } = {},
) {
	const { method = "POST" } = options

	const form = new FormData()

	for (const [key, value] of Object.entries(data)) {
		if (value instanceof File) {
			form.append(key, value, value.name)
		} else if (Array.isArray(value) && value.every((item) => typeof item === "object")) {
			form.append(key, JSON.stringify(value))
		} else {
			form.append(key, value as string)
		}
	}

	const rep = await fetch(url, {
		method,
		body: form,
	})

	return useDeserialize(await rep.text())
}

/**
 * Use to convert time from seconds to milliseconds, minutes, hours, days, and weeks and vice versa.
 *
 * @param time - The time to convert
 *
 * @param from - The unit to convert from
 *
 * @param to - The unit to convert to
 *
 * @example
 * ```ts
 * const time = useConvertTimeUnits(60, "seconds", "milliseconds")
 *
 * console.log(time) // 60000
 *
 * const time = useConvertTimeUnits(60, "seconds", "minutes")
 *
 * console.log(time) // 1
 * ```
 *
 * @returns The converted time.
 */
export function useConvertTimeUnits(
	time: number,
	from: "seconds" | "milliseconds" | "minutes" | "hours" | "days" | "weeks",
	to: "seconds" | "milliseconds" | "minutes" | "hours" | "days" | "weeks",
) {
	const units = {
		seconds: 1000,
		milliseconds: 1,
		minutes: 60,
		hours: 60,
		days: 24,
		weeks: 7,
	}

	const from_unit = units[from]
	const to_unit = units[to]

	return (time * from_unit) / to_unit
}

/**
 * A helper function that parses a value into a date object.
 *
 * @param date - The value to parse.
 *
 * @example
 * ```ts
 * const date = useParseDate("2021-10-10")
 *
 * console.log(date) // Sun Oct 10 2021 00:00:00 GMT+0000 (Coordinated Universal Time)
 * ```
 * @returns The parsed date object.
 */
export function useParseDate(date: DateLike): Date {
	if (date === null || date === undefined) return new Date(NaN)

	if (date instanceof Date) return date

	if (typeof date === "string") return new Date(date)

	return new Date(date)
}

/**
 * A function that get date type, that inspired from python type function.
 *
 * @remarks This function is used to get the type of the value.
 *
 * @param value - The value to get type.
 *
 * @param full - Whether to return the full type or not.
 *
 * @example
 * ```ts
 * useType(1) // number
 * useType(1, true) // [object Number]
 * ```
 *
 * @see https://docs.python.org/3/library/functions.html#type
 *
 * @returns The type of the value.
 */
export function useType<T>(value: T, full = false): string {
	const _value = Object.prototype.toString.call(value)

	if (full) return _value
	else return _value.slice(8, -1).toLowerCase()
}

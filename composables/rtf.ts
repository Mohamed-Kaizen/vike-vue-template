import type { useRTFOptions, DateLike } from "./types"

/**
 * A helper function to format the relative time.
 *
 * @param _rtf - The relative time formatter.
 *
 * @param time - The time to format.
 *
 * @returns The formatted time.
 */
function format(_rtf: Intl.RelativeTimeFormat, time: number): string {
	const delta_seconds = Math.round((time - Date.now()) / 1000)

	// Array representing one minute, hour, day, week, month, etc in seconds
	const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity]

	const units: Intl.RelativeTimeFormatUnit[] = [
		"second",
		"minute",
		"hour",
		"day",
		"week",
		"month",
		"year",
	]

	const unit_index = cutoffs.findIndex((cutoff) => cutoff > Math.abs(delta_seconds))

	// Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
	// is one day in seconds, so we can divide our seconds by this to get the # of days
	const divisor = unit_index ? cutoffs[unit_index - 1] : 1

	return _rtf.format(Math.floor(delta_seconds / divisor), units[unit_index])
}

/**
 * Get the relative time string from a date.
 *
 * @param date - The date to format.
 *
 * @param options - The options to use.
 * - `locale` - The locale to use.
 * - `style` - The length of the internationalized message.
 * - `numeric` - The format of output message.
 * - `interval` - The interval to update the time in second. Defaults to 60 seconds.
 *
 * @example
 * ```ts
 * const {result} = useRTF(new Date())
 *
 * console.log(result.value) // "in 1 minute"
 *
 * // Update the time every 10 seconds
 * const {result} = useRTF(new Date(), {interval: 10})
 *
 * ```
 *
 * @returns The formatted time.
 */
export function useRTF(date: DateLike, options: useRTFOptions = {}) {
	const { locale = "en", style = "long", numeric = "auto", interval = 60 } = options

	date = useParseDate(date)

	const _rtf = new Intl.RelativeTimeFormat(locale, {
		style,
		numeric,
	})

	const time = date.getTime()

	const result = ref(format(_rtf, time))

	useIntervalFn(
		() => (result.value = format(_rtf, time)),
		useConvertTimeUnits(interval, "seconds", "milliseconds"),
	)

	return { result }
}

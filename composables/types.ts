export type Dict<
	T extends string | number | symbol = string | number | symbol,
	U = unknown,
> = Record<T, U>

export type unknowFn = (...args: unknown[]) => unknown

export interface useRTFOptions {
	/** The locale to use.
	 *
	 *
	 * @defaultValue en
	 */
	locale?: Intl.UnicodeBCP47LocaleIdentifier

	/** The length of the internationalized message.
	 *
	 * @defaultValue long
	 */
	style?: "long" | "short" | "narrow"

	/** The format of output message.
	 *
	 * @defaultValue auto
	 */
	numeric?: "always" | "auto"

	/**
	 * The interval to update the time.
	 *
	 * @defaultValue 60 second
	 */
	interval?: number
}

export type DateLike = Date | number | string

export interface useStrftimeOptions extends Intl.DateTimeFormatOptions {
	/**
	 * The locale to use
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
	 */
	locales?: Intl.LocalesArgument
}

export interface useSlugOptions {
	/**
	 * Use lower letters.
	 *
	 * @defaultValue true
	 */
	lower?: boolean

	/**
	 * Use uppercase letters.
	 *
	 * @defaultValue true
	 */
	upper?: boolean

	/**
	 * Use digits.
	 *
	 * @defaultValue true
	 */
	digits?: boolean

	/**
	 * Size of the slug.
	 *
	 * @defaultValue 6
	 */
	size?: number

	/**
	 * Text to use as a prefix.
	 *
	 */
	prefix?: string
}

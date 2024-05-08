import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { getCookie, setCookie } from "h3"

import type { H3Event, EventHandlerRequest } from "h3"

import { DEFAULT_LANG, LANGS, RTL_LANGS, DEFAULT_THEME, THEMES } from "../composables/constants"

const __filename = fileURLToPath(import.meta.url)

export const PROJECT_DIR = resolve(dirname(__filename), "..")

export const IS_PRODUCTION = process.env.NODE_ENV === "production"

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

export const HMR_PORT = process.env.HMR_PORT ? parseInt(process.env.HMR_PORT, 10) : 24678

/**
 * Get the user's language, direction, and theme preferences.
 *
 * @param event - H3 event object.
 */
export function get_preference(event: H3Event<EventHandlerRequest>) {
	let lang = getCookie(event, "lang") ?? DEFAULT_LANG

	const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr"

	let theme = getCookie(event, "theme") ?? DEFAULT_THEME

	if (!LANGS.includes(lang)) lang = DEFAULT_LANG

	if (!THEMES.includes(theme)) theme = DEFAULT_THEME

	setCookie(event, "lang", lang, { path: "/", httpOnly: true })

	setCookie(event, "theme", theme, { path: "/", httpOnly: true })

	return { lang, dir, theme }
}

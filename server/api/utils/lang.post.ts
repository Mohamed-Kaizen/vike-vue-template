import { defineEventHandler, readBody, setCookie } from "h3"

import { RTL_LANGS } from "../../../composables/constants"

export default defineEventHandler(async (event) => {
	const { lang } = await readBody(event)

	const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr"

	setCookie(event, "lang", lang, { httpOnly: true, path: "/" })

	setCookie(event, "dir", dir, { httpOnly: true, path: "/" })

	return {
		success: true,
	}
})

import { defineEventHandler, readBody, setCookie } from "h3"

export default defineEventHandler(async (event) => {
	const { theme } = await readBody(event)

	setCookie(event, "theme", theme, { httpOnly: true, path: "/" })

	return {
		success: true,
	}
})

import path from "node:path"

import fg from "fast-glob"
import { createRouter, eventHandler, setResponseHeaders, setResponseStatus } from "h3"
import { renderPage } from "vike/server"

import { PROJECT_DIR, get_preference } from "./utils"

// import
export const router = createRouter()

/**
 * Get all routes from the server/api directory
 *
 */
async function get_routes() {
	const API_DIR = path.join(PROJECT_DIR, "server", "api")

	const files = await fg(["**/*.js", "**/*.ts"], {
		cwd: API_DIR,
		ignore: ["_*", "dist", "node_modules"],
	})

	const methods = {
		get: /\.get\.[jt]s$/,
		post: /\.post\.[jt]s$/,
		put: /\.put\.[jt]s$/,
		delete: /\.delete\.[jt]s$/,
		patch: /\.patch\.[jt]s$/,
	}

	for (const file of files) {
		const mod = await import(path.join(API_DIR, file))

		if (!mod.default) {
			throw new Error(`No default export found in ${file}`)
		}

		let route_registered = false

		for (const [method, regex] of Object.entries(methods)) {
			if (file.match(regex)) {
				let route = `/api/${file.replace(regex, "").replace(/\\/g, "/")}`

				if (route.includes("index")) route = route.replace("index", "")

				// @ts-expect-error - it's ok
				router[method](route, mod.default)

				route_registered = true

				break
			}
		}

		if (!route_registered && file.match(/\.[jt]s$/)) {
			let route = `/api/${file.replace(/\.[jt]s$/, "").replace(/\\/g, "/")}`

			if (route.includes("index")) route = route.replace("index", "")

			router.use(route, mod.default)
		}
	}
}

get_routes()

/**
 * Vike route
 *
 * @see https://vike.dev
 **/
router.use(
	"/**",
	eventHandler(async (event) => {
		const { lang, dir, theme } = get_preference(event)

		const pageContextInit = {
			urlOriginal: event.node.req.originalUrl || event.node.req.url!,
			lang,
			dir,
			theme,
		}

		const pageContext = await renderPage(pageContextInit)

		const response = pageContext.httpResponse

		let dom = await response?.getBody()

		dom = dom?.replace(
			"<html lang='en'>",
			`<html lang='${lang}' dir='${dir}' class='${theme}'>`,
		)

		setResponseStatus(event, response?.statusCode)

		setResponseHeaders(event, Object.fromEntries(response?.headers ?? []))

		return dom
	}),
)

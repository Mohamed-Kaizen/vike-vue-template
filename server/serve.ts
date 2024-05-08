import { createServer } from "node:http"

import { createApp, fromNodeMiddleware, toNodeListener } from "h3"
import serveStatic from "serve-static"

import { router } from "./routers"
import { PROJECT_DIR, IS_PRODUCTION, PORT } from "./utils"

export async function start_server() {
	const app = createApp()

	if (IS_PRODUCTION) app.use("/", fromNodeMiddleware(serveStatic(`${PROJECT_DIR}/dist/client`)))
	else {
		const dev_middleware = await import("./dev")

		app.use(dev_middleware.default)
	}

	app.use(router)

	const server = createServer(toNodeListener(app)).listen(PORT)

	server.on("listening", () => {
		console.log(`Server listening on http://localhost:${PORT}`)
	})
}

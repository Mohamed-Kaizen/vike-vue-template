import { fromNodeMiddleware } from "h3"
import { createServer } from "vite"

import { PROJECT_DIR, HMR_PORT } from "./utils"

const vite_dev_middleware = (
	await createServer({
		root: PROJECT_DIR,
		server: { middlewareMode: true, hmr: { port: HMR_PORT } },
	})
).middlewares

export default fromNodeMiddleware(vite_dev_middleware)

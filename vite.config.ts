import vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import ssr from "vike/plugin"
import { defineConfig } from "vite"
import vercel from "vite-plugin-vercel"

export default defineConfig({
	resolve: {
		alias: {
			"~/": __dirname,
			"#composables": `${__dirname}/composables`,
			"#components": `${__dirname}/components`,
			"#layouts": `${__dirname}/layouts`,
			"#assets": `${__dirname}/assets`,
			"#i18n": `${__dirname}/i18n`,
		},
	},

	plugins: [
		vercel(),

		ssr(),

		Unocss(),

		AutoImport({
			imports: ["vue", "@vueuse/core", { ofetch: ["ofetch"] }],
			eslintrc: {
				enabled: true,
			},
			dirs: ["./composables"],
		}),

		Components({
			dirs: ["./components"],
			extensions: ["vue"],
			directoryAsNamespace: true,
		}),

		vue({
			script: {
				propsDestructure: true,
			},
		}),
	],
})

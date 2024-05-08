import vikeVue from "vike-vue/config"

import type { Config } from "vike/types"

import Layout from "../layouts/default.vue"
import Head from "../layouts/head.vue"

// Default config (can be overridden by pages)
export default {
	passToClient: ["lang", "theme", "dir"],
	Layout,
	Head,
	title: "Vike Vue",
	extends: vikeVue,
} satisfies Config

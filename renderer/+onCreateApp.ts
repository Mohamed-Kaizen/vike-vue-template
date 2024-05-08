import { loadLocaleAsync } from "#i18n/i18n-util.async"
import { i18nPlugin } from "#i18n/i18n-vue"

import type { Locales } from "#i18n/i18n-types"
import type { PageContextServer } from "vike/types"

interface Context extends PageContextServer {
	lang: string
}

export async function onCreateApp(context: Context) {
	const { app } = context

	const lang = context.lang as Locales

	await loadLocaleAsync(lang)

	app?.use(i18nPlugin, lang)
}

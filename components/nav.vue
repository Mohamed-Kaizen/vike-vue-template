<script setup lang="ts">
import { loadLocaleAsync } from "#i18n/i18n-util.async"
import { typesafeI18n } from "#i18n/i18n-vue"

import type { Locales } from "#i18n/i18n-types"

const { setLocale } = typesafeI18n()

async function change_lang(lang: string) {
	const { success } = await ofetch("/api/utils/lang", {
		method: "POST",
		body: { lang },
	})

	if (success) {
		await loadLocaleAsync(lang as Locales)
		setLocale(lang as Locales)

		useLangToggle(lang)
	}
}
</script>
<template>
	<nav class=":uno: my-4 flex items-center justify-between">
		<div class=":uno: flex items-center">
			<div class=":uno: relative">
				<button class=":uno: rtl:(ml-2 mr-0) peer mr-2 px-3 py-2.5">
					<div class="i-mdi-translate h-5 w-5 fill-current"></div>
				</button>

				<form
					class=":uno: min-w-50 top-120% left-50% z-99 translate-x--50% duration-800 dark:(bg-gray-900 border-none) invisible absolute w-max overflow-hidden rounded-lg border bg-white p-1 text-xs opacity-0 shadow-xl peer-focus:visible peer-focus:opacity-100 md:text-sm"
					@submit.prevent>
					<button
						class=":uno: dark:(bg-gray-900 hover:bg-gray-700) block w-full cursor-pointer rounded-md px-3 py-2 hover:bg-gray-300"
						formaction="/utils?/lang"
						name="lang"
						value="en"
						type="button"
						@click="change_lang('en')">
						English
					</button>

					<button
						class=":uno: dark:(bg-gray-900 hover:bg-gray-700) block w-full cursor-pointer rounded-md px-3 py-2 hover:bg-gray-300"
						formaction="/utils?/lang"
						name="lang"
						value="ar"
						type="button"
						@click="change_lang('ar')">
						عربي
					</button>

					<input name="redirect_to" type="hidden" value="{$page.url.pathname}" hidden />
				</form>
			</div>
		</div>
	</nav>
</template>

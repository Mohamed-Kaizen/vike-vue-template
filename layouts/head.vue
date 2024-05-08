<script setup lang="ts">
import apple from "#assets/img/icons/apple-touch-icon.png"
import favicon from "#assets/img/icons/favicon.ico"
import favicon16 from "#assets/img/icons/favicon-16x16.png"
import favicon32 from "#assets/img/icons/favicon-32x32.png"
import safari from "#assets/img/icons/safari-pinned-tab.svg"
import manifest from "#assets/manifest.webmanifest"
import { typesafeI18n } from "#i18n/i18n-vue"

const { LL } = typesafeI18n()
</script>

<template>
	<title>{{ LL.title.app_name() }}</title>

	<meta content="yes" name="mobile-web-app-capable" />

	<meta content="yes" name="apple-mobile-web-app-capable" />

	<meta name="msapplication-TileColor" content="#da532c" />

	<meta name="theme-color" content="#ffffff" />

	<link rel="mask-icon" :href="safari" color="#5bbad5" />

	<link rel="apple-touch-icon" sizes="180x180" :href="apple" />

	<link rel="icon" :href="favicon" />

	<link rel="icon" type="image/png" sizes="32x32" :href="favicon32" />

	<link rel="icon" type="image/png" sizes="16x16" :href="favicon16" />

	<link rel="manifest" :href="manifest" />

	<meta content="Lenat" name="application-name" />

	<meta content="Lenat" name="apple-mobile-web-app-title" />

	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<meta :content="LL.title.app_description()" name="description" />

	<meta :content="LL.title.app_name()" property="og:title" />

	<meta :content="LL.title.app_description()" property="og:description" />

	<meta content="website" property="og:type" />

	<meta content="https://example.com" property="og:url" />

	<meta content="https://example.com/img/logo.png" property="og:image" />

	<meta :content="LL.title.app_name()" property="og:site_name" />

	<meta :content="LL.title.app_name()" property="twitter:title" />

	<meta content="summary_large_image" property="twitter:card" />

	<meta :content="LL.title.app_description()" property="twitter:description" />

	<meta content="@vike" property="twitter:site" />

	<meta content="@vike" property="twitter:creator" />

	<meta content="https://example.com" property="twitter:url" />

	<meta content="https://example.com/img/logo.png" property="twitter:image" />

	<meta content="index, follow" name="robots" />
</template>

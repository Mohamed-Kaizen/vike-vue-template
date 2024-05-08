<script lang="ts" setup>
import { usePageContext } from "vike-vue/usePageContext"

import { typesafeI18n } from "#i18n/i18n-vue"

const { LL } = typesafeI18n()

const ctx = usePageContext()

let { is404, abortReason } = ctx

if (!abortReason) {
	abortReason = is404 ? LL.value.error.not_found() : LL.value.error.went_wrong()
}
const heading = is404 ? LL.value.error[404]() : LL.value.error[500]()
</script>

<template>
	<h1>{{ heading }}</h1>
	<p>{{ abortReason }}</p>
</template>

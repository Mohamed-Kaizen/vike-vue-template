<script setup lang="ts">
import { typesafeI18n } from "#i18n/i18n-vue"

const { LL } = typesafeI18n()
</script>

<template>
	<h1>{{ LL.HI() }}</h1>
</template>

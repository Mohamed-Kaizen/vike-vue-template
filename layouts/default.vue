<script lang="ts" setup>
import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import "#assets/css/progress.css"
</script>

<template>
	<header>
		<Nav />
	</header>

	<main>
		<slot />
	</main>
</template>

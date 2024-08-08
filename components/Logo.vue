<template>
	<NuxtLink :to="localeRoute('/')">
		<img
			src="/public/logo.png"
			alt="logo"
			class="md:max-w-[65px] md:max-h-[65px] max-w-[55px] max-h-[55px]" />
	</NuxtLink>
</template>

<script setup>
	const localeRoute = useLocaleRoute();

	const store = useLandingStore();
</script>

<style scoped></style>

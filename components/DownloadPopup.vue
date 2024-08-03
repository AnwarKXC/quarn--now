<template>
	<div
		class="w-full lg:hidden drop-shadow-sm bg-white/70 backdrop-blur-sm py-3.5 fixed duration-1000 z-[9999] border" v-if="data?.branding"
		:class="showDownloadPopup ? 'top-0' : '-top-36'">
		<div class="container relative flex gap-5 justify-between items-center">
			<div
				class="text-sm md:text-xl font-semibold tracking-wide text-prime line-clamp-3 flex items-center gap-1">
				<Logo />

				<span>
					{{ data?.banners_native[useRandom(data?.banners_native?.length)]?.sub_title }}
				</span>
			</div>

			<NuxtLink
				target="_blank"
				:href="data?.branding?.link_download"
				class="btn__prime text-white bg-prime text-center"
				@click="showDownloadPopup = true">
				{{ data?.branding?.title_download }}
			</NuxtLink>
		</div>

		<button
			class="absolute m-4 right-0 -bottom-9 bg-white/70"
			@click="showDownloadPopup = false">
			<img
				src="/svgs/close-mobile-toggel.svg"
				alt="toggel mobile icon header"
				class="" />
		</button>
	</div>
</template>

<script setup>
	const showDownloadPopup = ref(false)
	const { data } = useLandingStore()

	onMounted(() => {
		setTimeout(() => {
			showDownloadPopup.value = true
		}, 5000)
	})
</script>

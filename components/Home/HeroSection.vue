<template>


	<main class="grid lg:grid-cols-2 md:grid-cols-3 gap-8 container items-center ">
		<div class="cent w-full lg:order-first">
			<img
				:src="data?.landing2?.section1_image?.data?.attributes?.url"
				alt=" hero"
				class="max-h-96" loading="eager" preload />
		</div>


		<div class="grid gap-2 md:col-span-2 lg:col-span-1 md:order-first max-md:place-items-center">
			<h1 class="text-brown text-xl sm:text-3xl lg:text-[36px] font-bold md:leading-relaxed">
				{{ data?.landing2?.section1_title1 }}
			</h1>
			<h2 class="text-brown/80 text-base sm:text-xl lg:text-[30px] md:leading-10 max-w-[615px]">
				{{ data?.landing2?.section1_title2 }}
			</h2>
			<div class="flex items-center gap-8 mt-1">
				<NuxtLink
					:to="localeRoute('/app/prayer-time')"
					class="btn__prime bg-prime text-white w-fit my-4">
					{{ $t("index.prayerWeb") }}</NuxtLink
				>
				<button
					class="cent gap-2"
					@click="active = true">
					<button class="size-16 aspect-square relative">
						<img
							src="/svgs/play-index.svg"
							alt=" play"
							class="circle" />
						<img
							src="/svgs/play-index.svg"
							alt=" play"
							class="border-transparent border-[8px] absolute inset-0 size-full" />
						<!-- <div class="absolute inset-0 size-full rounded-full circle"></div> -->
					</button>
					<span class="text-prime text-lg font-semibold">{{ $t("index.watch") }}</span>
				</button>
			</div>
		</div>
		<div
			class="fixed max-md:p-4 inset-0 size-full z-50 bg-black/80 cent flex-col hidden"
			v-if="active">
			<div class="w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
				<button
					@click="active = false"
					class="text-white font-bold font-['Almarai'] text-xl">
					<img
						src="/svgs/close-x.svg"
						alt=" close" />
				</button>
			</div>

			<iframe
				class="w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-1/2 aspect-video drop-shadow rounded-lg overflow-hidden"
				:src="getYouTubeVideoID(data?.landing2?.section1_youtube_link)"
				allowfullscreen>
			</iframe>
		</div>
	</main>
</template>

<script setup>
	import { useLandingStore } from "~/stores/landingStore.js"
	const { data } = useLandingStore()

	const active = ref(false)
	const localeRoute = useLocaleRoute()

	function getYouTubeVideoID(url) {
		try {
			// Parse the URL
			const urlObj = new URL(url)
			// Get the value of the 'v' parameter
			return "https://www.youtube.com/embed/" + urlObj.searchParams.get("v")
		} catch (error) {
			console.error("Invalid URL", error)
			return null // Return null if the URL is invalid
		}
	}
</script>
<style scoped>
	.circle {
		border: 10px solid #b9dcd6;
		border-radius: 50%;
		/* animation: scaleUp 3s infinite ease-out; */
		animation: ping 4s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes ping {
		75%,
		100% {
			transform: scale(1.6);
			opacity: 0;
		}
	}

	@keyframes scaleUp {
		from {
			border-width: 0px;
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		to {
			border-width: 8px;
			opacity: 1;
		}
	}
</style>

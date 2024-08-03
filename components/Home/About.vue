<template>
	<section
		class="relative overflow-x-hidden text-prime divide-y-[2rem] divide-transparent pb-20 overflow-hidden">
		<img
			:src="arabisc"
			alt=" about"
			class="absolute xl:left-[-250px] lg:w-[300px] lg:left-[-150px] xl:top-16 lg:top-32 xl:w-[500px] rotate max-lg:hidden" />

		<div
			class="text-center divide-y-[1.5rem] divide-transparent container z-[999]"
			data-aos="fade-up"
			data-aos-delay="100"
			data-aos-duration="1000"
			data-aos-offset="100"
			data-aos-easing="ease-in-out"
			data-aos-mirror="true">
			<h1 class="cent gap-4 font-bold">
				<Logo />

				<span class="max-w-52">
					{{ data?.landing2?.section4_title1 }}
				</span>
			</h1>
			<p class="text-sm max-w-3xl mx-auto leading-6">
				{{ data?.landing2?.section4_description }}
			</p>
		</div>
		<div class="grid grid-cols-12 gap-2 gap-y-12 mt-4 text-prime container z-50">
			<div
				class="flex items-center gap-4 col-span-full lg:col-start-2 xl:col-start-3 z-50"
				data-aos="fade-left"
				data-aos-offset="300"
				data-aos-duration="500"
				data-aos-delay="100"
				data-aos-easing="ease-in-sine">
				<NuxtImg
					src="https://www.prayer-now.com/wp-content/themes/prayerNow/assets/v3/img/vision.png"
					alt=" vision"
					class="aspect-square max-w-[160px] w-full rounded-full overflow-hidden" />
				<div class="grid gap-2 max-w-xl">
					<h4 class="max-md:text-lg font-semibold">
						{{ data?.landing2?.section4_title_vision }}
					</h4>
					<p>
						{{ data?.landing2?.section4_description_vision }}
					</p>
				</div>
			</div>
			<div
				class="flex items-center gap-4 col-span-full lg:col-start-3 xl:col-start-5 z-50"
				data-aos="fade-right"
				data-aos-duration="500"
				data-aos-delay="300"
				data-aos-easing="ease-in-sine">
				<div class="grid gap-2 max-w-xl">
					<h4 class="max-md:text-lg font-semibold">
						{{ data?.landing2?.section4_title_mission }}
					</h4>
					<p>
						{{ data?.landing2?.section4_description_mission }}
					</p>
				</div>
				<NuxtImg
					src="https://www.prayer-now.com/wp-content/themes/prayerNow/assets/v3/img/vision.png"
					alt=" mission"
					class="aspect-square max-w-[160px] w-full rounded-full overflow-hidden" />
			</div>
		</div>

		<img
			:src="arabisc"
			alt=" about"
			class="absolute xl:right-[-250px] xl:top-16 lg:top-32 xl:w-[500px] lg:w-[300px] lg:right-[-150px] rotate max-lg:hidden" />
	</section>
</template>

<script setup>
	import arabisc from "~/assets/images/arabisk.png";
	const { data } = useLandingStore();
</script>
<style scoped>
	.rotate {
		animation: rotate360 100s infinite linear;
	}

	@keyframes rotate360 {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>

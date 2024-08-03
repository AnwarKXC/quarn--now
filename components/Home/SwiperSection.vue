<template>
	<div class="container md:mt-12 overflow-x-hidden">
		<h1 class="h__prime text-center">{{ data?.landing2?.section2_title }}</h1>

		<Swiper
			:modules="[SwiperAutoplay, SwiperPagination]"
			:slidesPerView="1"
			:spaceBetween="10"
			:loop="true"
			:grabCursor="true"
			:threshold="10"
			:autoplay="{
				delay: 4000,
			}"
			:speed="500"
			:preventClicks="false"
			:pagination="{
				clickable: true,
			}"
			:breakpoints="{
				'1024': {
					slidesPerView: 2,
					spaceBetween: 20,
				},
			}">
			<SwiperSlide
				v-for="slide in slides"
				:key="slide">
				<div class="flex items-end">
					<NuxtImg
						:src="slide?.image_big?.data?.attributes?.url"
						:alt="slide?.image_big?.data?.attributes?.alternativeText"
						class="h-[220px] sm:h-[350px] lg:h-[430px]"
						data-aos="flip-left"
						data-aos-duration="700"
						data-aos-offset="300"
						data-aos-easing="ease-in-sine" />

					<div class="grid gap-1 sm:gap-3">
						<div>
							<NuxtImg
								:src="slide?.icon?.data?.attributes?.url"
								:alt="slide?.icon?.data?.attributes?.alternativeText"
								class="sm:w-20 w-12 px-3" />
						</div>
						<h5 class="font-bold px-3 text-prime font-arabic">{{ slide?.title }}</h5>
						<div
							class="w-full sm:py-6 rounded-xl rounded-s -ms-1 -z-50 overflow-hidden sm:p-4 p-3 max-w-[500px] bg-prime mb-2 sm:mb-10 text-white"
							data-aos="fade-left"
							data-aos-duration="1000"
							data-aos-delay="1000"
							data-aos-easing="ease-in-sine">
							<h6
								class="font-normal text-xs sm:text-base leading-5 sm:leading-7 tracking-wide line-clamp-[7]">
								{{ slide?.sub_title }}
							</h6>
						</div>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>

		<div
			class="fixed max-md:p-4 inset-0 size-full z-[999] bg-black/80 cent flex-col hidden"
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
				:src="url"
				allowfullscreen>
			</iframe>
		</div>
		<nuxt-link
			:to="
				locale === 'ar'
					? 'https://www.prayer-now.com/%d8%a7%d9%84%d9%85%d9%85%d9%8a%d8%b2%d8%a7%d8%aa/'
					: 'https://www.prayer-now.com/en/features/'
			"
			class="cent my-4"
			target="_blank">
			<button class="btn__prime border-prime border text-prime">
				{{ data?.landing2?.section2_more_title }}
			</button>
		</nuxt-link>
	</div>
</template>

<script setup>
	const { data } = useLandingStore();
	const slides = ref(data?.landing2_features);

	const { locale } = useI18n();

	const active = ref(false);
	const url = ref(" ");

	function changeUrl(activeUrl) {
		active.value = true;
		try {
			// Parse the URL
			const urlObj = new URL(activeUrl);
			// Get the value of the 'v' parameter
			return (url.value = "https://www.youtube.com/embed/" + urlObj.searchParams.get("v"));
		} catch (error) {
			console.error("Invalid URL", error);
			return null; // Return null if the URL is invalid
		}
	}
</script>

<style scoped>
	.circle {
		border: 10px solid #bedcd77e;
		border-radius: 50%;
		/* animation: scaleUp 3s infinite ease-out; */
		animation: ping 4s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes ping {
		75%,
		100% {
			transform: scale(1.3);
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

	.swiper-slide {
		font-family: "Almarai", sans-serif !important;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		font-size: 4rem;
		margin-block: 4rem;
		font-weight: bold;
		font-family: "Roboto", sans-serif;
	}

	:global(.swiper-pagination-bullet) {
		background: #1e4d45 !important;
		width: 10px;
		/* Width of the pagination bullet */
		height: 10px;
		/* Height of the pagination bullet */
	}

	:global(.swiper-pagination-bullet-active) {
		width: 30px;
		border-radius: 1rem;
	}
</style>

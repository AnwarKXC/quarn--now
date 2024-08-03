<template>
	<div
		class="relative md:h-[550px] h-[800px] max-md:mb-20 overflow-x-hidden"
		data-aos="fade-up"
		data-aos-delay="200"
		data-aos-duration="1000"
		data-aos-offset="200"
		data-aos-easing="ease-in-out"
		data-aos-mirror="true">
		<div
			class="absolute container inset-0 grid md:grid-cols-2 gap-2 gap-y-8 lg:gap-8 items-center z-10">
			<div class="grid gap-6 max-md:mt-20 max-md:place-items-center">
				<h2 class="text-white lg:text-[36px] font-bold lg:leading-relaxed">
					{{ data?.landing2?.section3_title1 }}
				</h2>
				<p class="text-white lg:text-lg lg:leading-10 leading-7 max-md:text-center">
					{{ data?.landing2?.section3_title2 }}
				</p>
				<div class="cent gap-4 text-white max-lg:flex-wrap">
					<nuxt-link
						:to="data?.branding?.link_download_google_play || ''"
						target="_blank"
						class="px-4 py-2 min-w-fit hover:bg-white/5 w-44 rounded-[60px] flex-1 text-center cent border border-white gap-1 text-sm">
						<NuxtImg
							src="/google-icon-white.png"
							alt=" download"
							class="max-h-8" />
						{{ $t("index.downloadfrom") }}<br />
						&nbsp;Google play
					</nuxt-link>
					<nuxt-link
						:to="data?.branding?.link_download_apple || ''"
						target="_blank"
						class="px-4 py-2 min-w-fit hover:bg-white/5 w-44 rounded-[60px] flex-1 text-center cent border border-white gap-1 text-sm">
						<NuxtImg
							src="/apple-icon-white.png"
							alt=" download"
							class="max-h-8" />
						{{ $t("index.downloadfrom") }} <br />&nbsp;App Store
					</nuxt-link>
					<nuxt-link
						:to="data?.branding?.link_download_app_gallery || ''"
						target="_blank"
						class="px-4 py-2 min-w-fit hover:bg-white/5 w-44 rounded-[60px] flex-1 text-center cent border border-white gap-1 text-sm">
						<NuxtImg
							src="/appgallery-icon-white.png"
							alt=" download"
							class="max-h-8" />
						{{ $t("index.downloadfrom") }}<br />

						&nbsp;AppGallery
					</nuxt-link>
				</div>
			</div>
			<div
				class="cent"
				data-aos="fade-right"
				data-aos-offset="300"
				data-aos-duration="500"
				data-aos-delay="300"
				data-aos-easing="ease-in-sine">
				<img
					:src="data?.landing2?.section3_image?.data?.attributes?.url"
					alt=" download"
					class="md:max-h-[500px] max-h-[400px]" />
			</div>
		</div>
		<div class="sloopy absolute inset-0 overflow-visible"></div>
	</div>
</template>

<script setup>
	const { data } = useLandingStore();
</script>

<style scoped>
	.sloopy {
		background: #1e4d45;
		height: 95%;
		z-index: 1;
		clip-path: polygon(0 15%, 100% 0%, 100% 85%, 0% 100%);
	}
	@media screen and (max-width: 767px) {
		.sloopy {
			clip-path: polygon(0 10%, 100% 0%, 100% 90%, 0% 100%);
		}
	}
</style>

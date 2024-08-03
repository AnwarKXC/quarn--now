<template>
	<div class="bg-white rounded-xl border border-gray-200">
		<div class="grid md:grid-cols-2 md:gap-2 gap-8">
			<div class="w-full flex items-center max-md:justify-center py-6 px-4">
				<div class="grid gap-2 max-md:justify-items-center">
					<p class="max-md:text-center text-zinc-700 text-[15px] font-normal">
						{{ activeBanners[useRandom(activeBanners.length)]?.sub_title }}
					</p>
					<h2 class="h__prime max-md:text-center">{{ activeBanners[useRandom(activeBanners.length)]?.title }}</h2>
					<div class="w-full flex gap-3 items-center flex-wrap justify-center mt-4">
						<NuxtLink
							:to="links?.link_download_google_play"
							target="_blank"
							v-if="links?.link_download_google_play">
							<Image
								isrc="/svgs/google-store.svg"
								ialt="google play"
								iclass=" max-w-[140px] min-h-[41px] duration-300 hover:scale-105" />
						</NuxtLink>
						<NuxtLink
							:to="links?.link_download_apple"
							target="_blank"
							v-if="links?.link_download_apple">
							<Image
								isrc="/svgs/app-store.svg"
								ialt="app store"
								iclass=" max-w-[140px] min-h-[41px] duration-300 hover:scale-105" />
						</NuxtLink>
						<NuxtLink
							:to="links?.link_download_app_gallery"
							target="_blank"
							v-if="links?.link_download_app_gallery">
							<Image
								isrc="/huawei-appgalley.jpg"
								ialt="app store"
								iclass=" max-w-[140px] min-h-[41px] duration-300 hover:scale-105" />
						</NuxtLink>
					</div>
				</div>
			</div>
			<div class="overflow-hidden">
				<NuxtImg
					:src="activeBanners[useRandom(activeBanners.length)]?.image?.data?.attributes?.url"
					:alt="activeBanners[useRandom(activeBanners.length)]?.title"
					class="size-full"
					loading="lazy" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	const { data } = useLandingStore();

	const links = data.branding;
	const activeBanners = computed(() => {
		return data?.banners_native?.filter(
			(item) => item.active === true && item.location === "bottom",
		);
	});


</script>

<style scoped></style>

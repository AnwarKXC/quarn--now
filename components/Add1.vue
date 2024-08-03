<template>
	<div class="min-h-[244px] bg-white rounded-xl border border-gray-200 main__banner">
		<div class="cent h-full w-full">
			<div class="relative md:grid grid-cols-4 p-4 gap-1 w-full">
				<div class="md:col-span-3 flex items-center size-full">
					<div class="grid gap-4">
						<div class="text-zinc-700 md:text-[15px] text-[13px] font-normal">
							{{ activeOne?.sub_title }}
						</div>

						<h2
							class="h__prime !text-[#2F3843] lg:max-w-[600px] max-xxs:max-w-[280px] max-md:max-w-[500px] max-sm:max-w-[400px] lg:!leading-relaxed">
							{{ activeOne?.title }}
							<!-- Add optional chaining here -->
						</h2>
						<div class="flex">
							<!-- Check if links object and link_download property are defined -->
							<NuxtLink
								:to="activeOne?.link"
								target="_blank"
								class="bg-prime text-white btn__prime">
								{{ activeOne?.btn_title }}
							</NuxtLink>
						</div>
					</div>
				</div>
				<div
					class="flex md:justify-center justify-end items-center max-md:absolute rtl:left-0 ltr:right-0 bottom-0 max-md:size-[120px] max-xs:size-[90px] size-full ltr:scale-x-[-1] transform max-md:mx-4 md:w-full">
					<!-- Add optional chaining here for activeOne.image and data attributes -->
					<NuxtImg
						:src="activeOne?.image?.data?.attributes?.url || ''"
						alt=" banner 1"
						class="rounded w-full"
						loading="eager"
						preload />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const store = useLandingStore();

	const activeBanners = store?.data?.banners_native?.filter(
		(item) => item.active === true && item.location === "top",
	);

	const randomIndex = Math.floor(Math.random() * activeBanners.length);
	const activeOne = activeBanners[randomIndex];
</script>

<style scoped>
	.main__banner {
		position: relative;
	}

	.main__banner::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: url(/main__banner-bg.svg);
		@apply bg-right-bottom bg-no-repeat ltr:scale-x-[-1];
	}
</style>

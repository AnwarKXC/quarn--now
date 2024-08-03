<template>
	<div class="bg-white rounded-xl border border-gray-200 px-4 py-6 grid gap-10 content-start">
		<div class="cent cent__col">
			<h2 class="h__prime">{{ $t("advantagebanner.topheading") }}</h2>
			<p class="w-[236px] h-6 text-zinc-500 text-xs font-normal leading-[35px]">
				{{ $t("advantagebanner.topsubheading") }}
			</p>
		</div>

		<div class="flex justify-evenly gap-8 flex-wrap gap-y-12">
			<div
				class="sm:shrink-0 grid grid-rows-4 justify-center items-center"
				v-for="(item, index) in activeBanners"
				:key="index">
				<NuxtImg
					v-if="item && item.icon"
					:src="item?.icon?.data?.attributes?.url"
					:alt="item?.icon?.data?.attributes?.name"
					class="rounded-sm size-16 justify-self-center"
					loading="lazy" />

				<div
					v-if="item"
					class="text-center text-indigo-900 text-[25px] font-normal">
					{{ item?.title }}
				</div>
				<div
					v-if="item"
					class="md:max-w-[229px] row-span-2 max-w-64 text-center text-neutral-500 text-xs font-normal leading-5 self-start">
					{{ item?.description }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const activeBanners = ref([]);
	const { data } = useLandingStore();

	activeBanners.value = data?.features?.filter((item) => item.active === true);
</script>

<style scoped></style>

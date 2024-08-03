<template>
	<div class="lg:sticky top-[104px] grid gap-6">
		<div
			class="bg-zinc-700 rounded-xl border p-4 grid gap-3"
			v-if="quotsData[randomIndexQuotes]?.description">
			<div class="text-amber-400 text-xl font-bold font-['Almarai']">
				{{ quotsData[randomIndexQuotes]?.title || "" }}
			</div>
			<div class="text-gray-300 text-xs font-normal font-['Almarai'] leading-[19px]">
				{{ quotsData[randomIndexQuotes]?.description || "" }}
			</div>
		</div>
		<NuxtLink
			v-if="leftData[randomIndexDataLeft]?.image?.data?.attributes?.url"
			:to="leftData[randomIndexDataLeft]?.link"
			:aria-label="leftData[randomIndexDataLeft]?.image?.data?.attributes?.alternativeText">
			<NuxtImg
				:src="leftData[randomIndexDataLeft]?.image?.data?.attributes?.url || ''"
				:alt="leftData[randomIndexDataLeft]?.image?.data?.attributes?.alternativeText || ''"
				class="size-full bg-yellow-50 rounded-xl border border-gray-200 overflow-hidden"
				 />
		</NuxtLink>
	</div>
</template>

<script setup>
	const { data } = useLandingStore();

	const leftData = ref([]);
	const quotsData = ref([]);
	const randomIndexQuotes = ref(null);
	const randomIndexDataLeft = ref(null);

	watch(
		() => data,
		(newVal) => {
			if (newVal) {
				leftData.value =
					newVal?.banners_image?.filter(
						(item) => item.location === "left" && item.active === true,
					) || [];
				quotsData.value = newVal?.quotes?.filter((item) => item.active === true) || [];
			}
		},
		{ deep: true, immediate: true },
	);
	const getRandomIndex = (length) => {
		return Math.floor(Math.random() * length);
	};
	watch(
		() => [quotsData, leftData],
		() => {
			if (quotsData.value.length > 0) {
				randomIndexQuotes.value = getRandomIndex(quotsData.value.length);
			}
			if (leftData.value.length > 0) {
				randomIndexDataLeft.value = getRandomIndex(leftData.value.length);
			}
		},
		{ deep: true, immediate: true },
	);
</script>

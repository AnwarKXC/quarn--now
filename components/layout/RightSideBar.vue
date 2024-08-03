<template>
	<div class="lg:sticky top-[104px]">
		<div class="grid gap-6">
			<NavLinks />
			<NuxtLink
				:aria-label="rightData?.image?.data?.attributes?.alternativeText"
				v-if="rightData[randomIndexDataRight]?.image?.data?.attributes?.url"
				:to="rightData[randomIndexDataRight]?.link">
				<NuxtImg
					v-if="rightData[randomIndexDataRight]?.image?.data?.attributes?.url"
					:src="rightData[randomIndexDataRight]?.image?.data?.attributes?.url || ''"
					:alt="rightData?.image?.data?.attributes?.alternativeText || ''"
					class="object-cover size-full bg-white rounded-xl border border-gray-200 overflow-hidden" />
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	const { data } = useLandingStore();

	const rightData = ref([]);
	const randomIndexDataRight = ref(null);

	watch(
		() => data.banners_image,
		(newVal) => {
			if (newVal) {
				rightData.value =
					newVal?.filter((item) => item.location === "right" && item.active === true) || [];
			}
		},
		{ deep: true, immediate: true },
	);
	const getRandomIndex = (length) => {
		return Math.floor(Math.random() * length);
	};
	watch(
		() => rightData,
		() => {
			if (rightData.value.length > 0) {
				randomIndexDataRight.value = getRandomIndex(rightData.value.length);
			}
		},
		{ deep: true, immediate: true },
	);
</script>

<style scoped></style>
p

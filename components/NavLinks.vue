<template>
	<div class="rounded-xl border border-gray-200 relative overflow-hidden">
		<ul class="bg-white grid">
			<li class="border-b border-gray-200 flex p-1.5">
				<NuxtLink
					:to="localeRoute(`/`)"
					:class="baseRouteName == 'index' ? 'bg-prime text-white' : ''"
					class="flex items-center px-4 hover:bg-prime w-full hover:text-white duration-300 rounded-xl group">
					<Image
						isrc="/svgs/quran.svg"
						ialt="ads"
						iclass="group-hover:invert  w-[20px] h-[29px]"
						:class="baseRouteName === 'index' ? 'invert' : ''" />

					<Button
						buttonText="sidebar.item1"
						buttonClass=" btn__prime !text-start !justify-start  !ps-3 !text-[15px]">
					</Button>
				</NuxtLink>
			</li>

			<!-- cp data loop -->

			<template v-if="data?.menu">
				<li
					v-for="(item, index) in data?.menu"
					:key="index"
					class="border-gray-200 flex p-1.5 border-b">
					<NuxtLink
						v-if="item?.link"
						:to="item?.link"
						:class="route?.path === `/${item?.link}` ? 'bg-prime text-white' : ''"
						class="flex items-center px-4 hover:bg-prime w-full hover:text-white duration-300 rounded-xl group">
						<NuxtImg
							v-if="item?.icon?.data?.attributes?.url"
							:src="item?.icon?.data?.attributes?.url || ''"
							:alt="item?.title"
							class="rounded-sm w-[20px] max-h-[29px]" />
						<span class="btn__prime !text-start !justify-start !text-[15px] !ps-3">{{
							item?.title
						}}</span>
					</NuxtLink>
				</li>
			</template>

			<li class="border-gray-200 cent p-2 bg-[#FCD364] bg-opacity-60">
				<NuxtLink
					:to="data?.branding?.link_download || ''"
					target="_blank"
					class="flex items-center w-full gap-3 px-2">
					<Image
						isrc="/svgs/download-side.svg"
						ialt="ads"
						iclass=" size-[34px]" />

					<span class="font-semibold text-[15px] text-[#080b2ae9]">
						{{ data?.branding?.title_download || "no data" }}</span
					>
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup>
	const { data } = useLandingStore();
	const localeRoute = useLocaleRoute();
	const route = useRoute();
	const getRouteBaseName = useRouteBaseName();
	const baseRouteName = computed(() => {
		return getRouteBaseName(route);
	});
</script>

<style scoped></style>

<template>
	<div
		class="bg-white rounded-xl border border-gray-200 px-4 flex justify-between flex-col gap-4 py-6"
		v-if="regions?.result?.regions?.length">
		<div class="grid gap-4">
			<div class="flex justify-between items-center gap-4 flex-wrap">
				<h2 class="h__prime">{{ $t("allcountries.heading") }}</h2>
				<div class="flex md:gap-[21px] gap-4 text-[#828282] flex-wrap">
					<template
						v-for="region in regions?.result.regions || []"
						:key="region?.id">
						<button
							class="text-prime region border-b-2 border-transparent"
							:class="region.id === index ? 'region_active' : ''"
							@click="changeRegion(region.id)">
							{{ region?.title }}
						</button>
					</template>
				</div>
			</div>

			<div
				class="country__grid"
				v-if="regions?.result?.countries?.length">
				<NuxtLink
					:to="
						localeRoute(
							`/app/prayer-time/${country.slug_country}/${country.countryCode}/${country.slug_city}/${country.city_id}`,
						)
					"
					v-for="country in regions.result.countries.slice(
						pageStart,
						pageStart + numberInPage,
					)"
					:key="country.city_id">
					<div
						class="size-full text-[#333333] rounded-2xl border border-gray-200 grid justify-center items-center hover:bg-prime duration-300 hover:text-white hover:drop-shadow gap-0.5"
						:class="
							country?.countryCode == route.params.countrycode
								? '!bg-prime !bg-opacity-20 !text-prime'
								: ''
						">
						<div class="p-2 max-h-24 overflow-hidden max-w-24 mx-auto drop-shadow-xl">
							<div class="overflow-hidden rounded-full">
								<NuxtImg
									:src="country?.image || ''"
									:alt="country?.title"
									class="size-full overflow-hidden scale-x-[1.15] scale-y-150 rounded-full" />
							</div>
						</div>
						<p class="text-center text-sm leading-5 pt-0 p-2">
							{{ country?.title }}
						</p>
					</div>
				</NuxtLink>
			</div>
			<div
				v-else
				class="text-center text-prime py-4 text-lg">
				No countries in this region
			</div>
		</div>
		<div v-if="regions.result.countries.length > numberInPage">
			<Pagination
				:total="regions.result.countries.length"
				:pageSize="numberInPage"
				:changed="isChangeingRegion"
				@pagestart="changePageStart($event)" />
		</div>
	</div>
</template>

<script setup>
	const localeRoute = useLocaleRoute();

	const route = useRoute();
	const { locale } = useI18n();
	const domain = import.meta.env.VITE_DASHBOARD_PRAYER;

	// pagination
	const pageStart = ref(0);
	const numberInPage = ref(21);

	const isChangeingRegion = ref(false);

	let index = ref(1);
	function changeRegion(id) {
		index.value = id;
		isChangeingRegion.value = !isChangeingRegion.value;
		pageStart.value = 0;
	}
	const { data: regions } = await useFetch(
		() =>
			`${domain}get-regions?regionID=${index.value}&locale=${
				locale.value === "ar" ? locale.value : "en"
			}`,
		{
			watch: [index],
		},
	);

	function changePageStart(e) {
		pageStart.value = e;
	}
</script>

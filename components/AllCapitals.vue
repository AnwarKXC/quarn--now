<template>
	<div
		class="bg-white rounded-lg border border-gray-200 px-4 py-6 flex justify-between flex-col gap-4">
		<div class="grid gap-4">
			<h2 class="h__prime">{{ $t("citiesbanner.heading") }}</h2>
			<div class="capitals__grid">
				<template v-if="capitals?.result?.cities">
					<NuxtLink
						v-for="city in capitals?.result?.cities?.slice(
							pageStart,
							pageStart + numberInPage,
						)"
						:key="city.id"
						:to="
							localeRoute(
								'/app/prayer-time/' +
									city.slug_country +
									'/' +
									city.countryCode +
									'/' +
									city.slug_city +
									'/' +
									city.id,
							)
						">
						<CityCard>
							<template v-slot:image>
								<NuxtImg
									v-if="city && city?.image"
									:src="city?.image"
									:alt="city?.title_city"
									class="size-full overflow-hidden scale-x-[1.15] scale-y-150 rounded-full" />
							</template>
							<template v-slot:text>
								{{ city?.title_city }}
							</template>
						</CityCard>
					</NuxtLink>
				</template>
			</div>
		</div>
		<div v-if="capitals && capitals?.result?.cities?.length > numberInPage">
			<Pagination
				:total="capitals?.result?.cities.length"
				:pageSize="numberInPage"
				@pagestart="pageStart = $event" />
		</div>
	</div>
</template>
<script setup>
	const localeRoute = useLocaleRoute();

	const { locale } = useI18n();
	const domain = import.meta.env.VITE_DASHBOARD_PRAYER;

	const capitals = await useFetchWithCache(
		`${domain}get-cities-capitals/?locale=${locale.value === "ar" ? locale.value : "en"}`,
	);
	// pagination
	const pageStart = ref(0);
	const numberInPage = ref(24);
</script>

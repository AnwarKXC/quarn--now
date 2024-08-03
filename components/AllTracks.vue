<template>
	<div
		class="bg-white rounded-xl border border-gray-200 px-4 py-6 grid gap-6"
		data-aos="fade-up"
		data-aos-delay="0"
		data-aos-duration="500"
		data-aos-offset="100"
		data-aos-easing="ease-in-out"
		data-aos-mirror="true">
		<h2 class="h__prime">{{ $t("playbanner.heading") }}</h2>
		<div class="tracks__grid">
			<nuxt-link
				:to="localeRoute(`/${playlist?.slug}/${playlist?.id}`)"
				v-for="playlist in playlists?.result?.data"
				:key="playlist">
				<TrackCard>
					<template v-slot:image>
						<Image
							:isrc="playlist?.img"
							:ialt="playlist?.img"
							iclass="h-full rounded" />
					</template>
					<template v-slot:title>
						{{ playlist.title }}
					</template>
					<template v-slot:by>
						<span>{{ formatNumber(playlist?.count_of_watch) }}</span>
						{{ $t("index.watch") }}
					</template>
				</TrackCard>
			</nuxt-link>
		</div>
	</div>
</template>

<script setup>
	const localeRoute = useLocaleRoute()

	const { locale } = useI18n()
	const domain = import.meta.env.VITE_DASHBOARD

	const { data: playlists } = await useFetch(
		() =>
			domain +
			`get-playlists?locale=${locale.value === "ar" ? locale.value : "en"}&isFeatured=true`,
	)

	function formatNumber(num) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(2) + "M"
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + "K"
		} else {
			return num.toString()
		}
	}
</script>

<style lang="scss" scoped></style>

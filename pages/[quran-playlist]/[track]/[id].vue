<template>
	<div class="grid gap-6">
		<div class="bg-white rounded-xl border border-gray-200 p-4 grid gap-4">
			<div class="flex justify-between">
				<div class="flex gap-3 items-center">
					<NuxtImg
						:src="playlist?.result?.track_info?.img"
						:alt="playlist?.result?.track_info?.title || 'track'"
						class="size-[93px] rounded-lg" />

					<div class="grid gap-2">
						<div
							class="text-right text-neutral-800 text-[25px] font-bold font-['Almarai'] leading-[30px]">
							{{ playlist.result.track_info.title }}
						</div>
						<div class="text-sec text-base flex items-center gap-1">
							{{ formatNumber(playlist.result.playlist_info[0].count_of_watch) }}
							<img
								src="/svgs/play.svg"
								alt=" play"
								class="size-5 hover:brightness-150 duration-200" />
						</div>

						<div class="text-prime text-base font-normal font-['Almarai']">
							{{ playlist.result.playlist_info[0].title }}
						</div>
					</div>
				</div>
				<div class="cent flex-col shrink-0 gap-3 justify-between">
					<PlaylistShare
						:share="
							production +
							'/' +
							locale +
							'/' +
							route.params.track +
							'/' +
							route.params.quranplaylist +
							'/' +
							route.params.id
						">
						<template #share>
							{{
								production +
								"/" +
								locale +
								"/" +
								route.params.track +
								"/" +
								route.params.quranplaylist +
								"/" +
								route.params.id
							}}
						</template>
					</PlaylistShare>
					<button>
						<img
							src="/svgs/Pause_Circle.svg"
							alt=" pause"
							class="size-14 hover:brightness-150 duration-200"
							v-if="store.status === true && store.url === playlist?.result?.track_info?.url"
							@click="store.togglePlay()" />
						<img
							v-else
							@click="
								store.selectTrack(
									playlist?.result.other_tracks,
									playlist?.result?.playlist_info[0]?.title,
									getTrackIndex(
										playlist?.result.other_tracks,
										playlist?.result.track_info.title,
									),
									playlist?.result?.playlist_info[0]?.slug,
									playlist?.result?.playlist_info[0]?.id,
								)
							"
							src="/svgs/play.svg"
							alt=" play"
							class="size-14 hover:brightness-150 duration-200" />
					</button>
				</div>
			</div>
		</div>

		<div class="grid gap-6 py-6 px-4 bg-white rounded-xl border border-gray200">
			<form
				@submit.prevent="searchTracks"
				class="relative">
				<input
					v-model="searchQuery"
					type="search"
					name=""
					class="w-full focus:border-prime outline-none border-2 rtl:pl-10 ltr:pr-10"
					:placeholder="$t('suratbanner.seacrhbar')" />
				<img
					src="/svgs/Search.svg"
					alt=" search"
					class="absolute rtl:left-1.5 ltr:right-1.5 top-2 rounded-xl bg-white ltr:scale-x-[-1] transform p-2" />
			</form>

			<TracksSection
				:tracks="filteredTracks"
				:playList="playlist?.result?.playlist_info[0]?.title || ''"
				:id="playlist?.result?.playlist_info[0]?.id || ''" />
		</div>

		<!-- ad2 -->
		<!-- <GoogleAds /> -->

		<!-- ad 3 -->
		<PrayerFeature />

		<!-- last add in home page -->
		<NativePanners />
	</div>
</template>

<script setup>
	const route = useRoute();

	const { locale } = useI18n();
	const dashboard = import.meta.env.VITE_DASHBOARD;
	const production = import.meta.env.VITE_PRODUCTION;

	const playlist = await useFetchWithCache(
		dashboard +
			"get-single-track?id=" +
			route.params.id +
			"&locale=" +
			(locale.value === "ar" ? locale.value : "en"),
	);
	import { useQuranStore } from "~/stores/quranStore";
	const store = useQuranStore();

	const searchQuery = ref("");
	const filteredTracks = ref(playlist.value.result?.other_tracks);

	watch(
		playlist,
		(newVal) => {
			filteredTracks.value = newVal?.result?.other_tracks;
		},
		{ deep: true },
	);
	const searchTracks = () => {
		const query = searchQuery.value.toLowerCase().trim();
		filteredTracks.value = playlist.value.result?.other_tracks?.filter((track) =>
			track.title.toLowerCase().includes(query),
		);
	};
	watch(searchQuery, () => {
		searchTracks();
	});

	function getTrackIndex(tracks, id) {
		// Use findIndex to find the index of the track with the given track_id
		return tracks.findIndex((track) => track.title === id);
	}

	function formatNumber(num) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(2) + "M";
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + "K";
		} else {
			return num.toString();
		}
	}

	const seo = playlist.value?.result?.track_info?.seo_data?.seo;
	if (playlist.value) {
		console.log(seo);

		const structuredData = seo.structuredData; // structuredData is already in JSON format
		useHead({
			title: seo.metaTitle,
			meta: [
				// General meta tags
				{ hid: "description", name: "description", content: seo.metaDescription },
				{ hid: "keywords", name: "keywords", content: seo.keywords },
				{ hid: "robots", name: "robots", content: seo.metaRobots },
				{ hid: "viewport", name: "viewport", content: seo.metaViewport },
				{
					hid: "og:image",
					property: "og:image",
					content: seo.metaSocial.image,
				},
				// Open Graph (Facebook, LinkedIn, etc.)
				{ hid: "og:title", property: "og:title", content: seo.metaSocial.title },
				{
					hid: "og:description",
					property: "og:description",
					content: seo.metaSocial.description,
				},
				{ hid: "og:image", property: "og:image", content: seo?.metaSocial?.image },

				{ hid: "og:type", property: "og:type", content: "website" },
				{ hid: "og:url", property: "og:url", content: seo.canonicalURL },
				{ hid: "og:site_name", property: "og:site_name", content: seo.siteName },
				{ hid: "og:locale", property: "og:locale", content: seo.locale },

				// Twitter Card
				{ hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
				{ hid: "twitter:title", name: "twitter:title", content: seo.metaTitle },
				{
					hid: "twitter:description",
					name: "twitter:description",
					content: seo.metaDescription,
				},
				{ hid: "twitter:image", name: "twitter:image", content: seo?.metaImage },
				{ hid: "twitter:site", name: "twitter:site", content: seo.twitterSite },
				{ hid: "twitter:creator", name: "twitter:creator", content: seo.twitterCreator },

				// Canonical URL
				{ hid: "canonical", rel: "canonical", href: seo.canonicalURL },
			],
			script: [
				{
					type: "application/ld+json",
					children: JSON.stringify(structuredData),
				},
			],
			__dangerouslyDisableSanitizers: ["script"],
		});
	}

	useSeoMeta({
		ogType: "website",
		titleTemplate: seo.metaTitle,
		ogSiteName: seo.metaTitle,
		ogDescription: seo.metaDescription,
		keywords: seo.keywords,
		ogUrl: seo.canonicalURL,

		ogTitle: seo.metaTitle,
	});
</script>

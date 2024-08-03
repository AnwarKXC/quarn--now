<template>
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
			:playList="props.playlist?.title"
			:slug="props.playlist?.slug"
			:id="props.playlist?.id" />
	</div>
</template>

<script setup>
	import { ref, watch } from "vue";
	const dashboard = import.meta.env.VITE_DASHBOARD;
	const { locale } = useI18n();
	const route = useRoute();
	const allTracks =await useFetchWithCache(
		dashboard +
			"get-tracks?playlistID=" +
			route.params.id +
			"&locale=" +
			(locale.value === "ar" ? locale.value : "en"),
	);

	const searchQuery = ref("");

	const filteredTracks = ref(allTracks.value?.result);

	watch(
		allTracks,
		(newData) => {
			filteredTracks.value = newData?.result;
		},
		{ deep: true },
	);
	const searchTracks = () => {
		const query = searchQuery.value.toLowerCase().trim();
		filteredTracks.value = allTracks.value.result?.filter((track) =>
			track.title.toLowerCase().includes(query),
		);
	};

	watch(searchQuery, () => {
		searchTracks();
	});

	const props = defineProps({
		playlist: {
			type: Object,
			default: {},
		},
	});
</script>

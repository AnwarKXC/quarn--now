<template>
	<div class="tracks__grid">
		<div
			v-for="(item, index) in props?.tracks"
			:key="track_id"
			class="bg-white rounded-xl border border-gray-200 flex items-center p-3 gap-2 group hover:bg-prime duration-200"
			:class="item.url === url ? '!bg-prime !bg-opacity-25 hover:!bg-prime' : ''">
			<div class="size-6 shrink-0 bg-amber-300 rounded-full cent text-prime text-sm">
				<span>{{ index + 1 }}</span>
			</div>
			<div class="grid gap-1 w-full">
				<NuxtLink
					:to="
						localeRoute(
							'/' + route.params.quranplaylist + '/' + item?.slug + '/' + item?.track_id,
						)
					"
					class="flex justify-between items-center">
					<div
						class="text-zinc-700 group-hover:text-neutral-200 duration-200 text-base font-semibold max-md:text-[13px]">
						{{ item?.title }}
					</div>
					<div class="text-neutral-400 text-sm font-normal cent gap-1.5">
						<span>
							{{ formatNumber(item?.watch_count) }}
						</span>
						<img
							src="/svgs/played.svg"
							alt=" played"
							class="mb-px" />
					</div>
				</NuxtLink>
				<div class="flex justify-between items-center">
					<NuxtLink
						:to="
							localeRoute(
								'/' + route.params.quranplaylist + '/' + item?.slug + '/' + item?.track_id,
							)
						"
						class="flex-grow text-prime md:text-sm text-xs font-normal group-hover:text-neutral-300 duration-200">
						{{ props.playList }}
					</NuxtLink>
					<div class="cent gap-5">
						<button>
							<img
								src="/svgs/play.svg"
								alt=" play"
								@click="
									store.selectTrack(
										props.tracks,
										props.playList,
										index,
										route.params.quranplaylist,
										props.id,
									)
								"
								class="size-5 hover:scale-110 group-hover:brightness-150 duration-200 hidden"
								:class="
									item.url !== url || (item.url === url && !status) ? '!block' : ''
								" />
							<img
								src="/svgs/Pause_Circle.svg"
								alt=" pause"
								class="size-5 hover:scale-110 group-hover:brightness-150 duration-200 hidden"
								:class="item.url === url && status ? '!block' : ''"
								@click="store.togglePlay()" />
						</button>
						<playlist-share
							:share="
								production +
								'/' +
								locale +
								'/' +
								route.params.quranplaylist +
								'/' +
								item?.slug +
								'/' +
								item?.track_id
							">
							<template #share>
								{{
									production +
									"/" +
									locale +
									"/" +
									route.params.quranplaylist +
									"/" +
									item?.slug +
									"/" +
									item?.track_id
								}}
							</template>
						</playlist-share>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const localeRoute = useLocaleRoute();
	const { locale } = useI18n();

	const props = defineProps({
		tracks: {
			type: Object,
			default: {},
		},
		playList: String,
		slug: String,
		id: String,
	});

	import { ref } from "vue";
	let play = ref(true);

	const route = useRoute();
	const production = import.meta.env.VITE_PRODUCTION;

	import { useQuranStore } from "~/stores/quranStore";

	const store = useQuranStore();
	const { url, status } = toRefs(store);

	function formatNumber(num) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(2) + "M";
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + "K";
		} else {
			return num.toString();
		}
	}
</script>

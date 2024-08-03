<template>
	<div class="bg-white rounded-xl border border-gray-200 grid gap-2 p-4 md:p-5">
		<div class="flex items-center md:gap-5 gap-2">
			<NuxtImg
				class="md:size-[145px] size-[64px] rounded-xl"
				:src="props.playlist.img"
				:alt="props.img_alt || 'sheikh Image'" />
			<div class="grid md:gap-1.5 gap-0.5 w-full">
				<div class="flex justify-between items-center w-full">
					<div class="cent gap-2">
						<div class="cent gap-1">
							<img
								src="/svgs/play.svg"
								alt=" play"
								class="max-md:w-4 max-md:h-4" />
							<p class="text-amber-300 md:text-[13px] text-[11px] font-normal">
								&nbsp; {{ formatNumber(props.playlist?.count_of_watch) }} &nbsp;
								{{ $t("playlistbanner.run") }}
							</p>
						</div>
					</div>
					<PlaylistShare
						:share="
							production + '/' + locale + '/' + props.playlist.slug + '/' + props.playlist.id
						">
						<template v-slot:share>
							{{
								production +
								"/" +
								locale +
								"/" +
								props.playlist.slug +
								"/" +
								props.playlist.id
							}}
						</template>
					</PlaylistShare>
				</div>

				<div class="text-neutral-700 md:text-2xl lg:text-3xl text-[14.25px] font-bold">
					{{ props.playlist.title }}
				</div>
				<div class="">
					<span
						class="text-stone-500 text-xs font-light line-clamp-2"
						ref="textClamped"
						>{{ props.playlist.description }}
					</span>
					<button
						class="text-prime text-xs font-medium underline mx-2"
						@click="seeMore"
						v-if="props.playlist.description">
						<span v-if="showMore"> {{ $t("seeLess") }}</span>
						<span v-else>
							{{ $t("seeMore") }}
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const route = useRoute();
	const { locale } = useI18n();
	const production = import.meta.env.VITE_PRODUCTION;
	import { ref } from "vue";

	const showMore = ref(false);
	const textClamped = ref(null);
	function seeMore() {
		showMore.value = !showMore.value;
		textClamped.value.classList.toggle("line-clamp-1");
	}

	const props = defineProps({
		playlist: {
			type: Object,
			default: {},
		},
	});
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

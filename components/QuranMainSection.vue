<template>
	<div class="bg-white rounded-xl border border-gray-200 px-4 py-6 grid gap-10 content-start">
		<div class="flex justify-between items-center gap-4">
			<h2 class="shrink-0 h__prime">{{ $t("eldersbanner.heading") }}</h2>
			<!-- <input type="search" name=""
				class=" md:min-w-72 max-xs:w-40 focus:border-prime outline-none border-2  "
				placeholder="ابحث عن القراء،  ..."> -->
		</div>

		<!-- all chars -->
		<div class="alphabitic__grid">
			<button
				class="col-span-3 bg-[#FCD465] text-prime border rounded cent p-1 hover:!text-white hover:!bg-prime"
				@click="showAllData"
				:class="selectedChar !== '' ? '!bg-white ' : ''">
				{{ $t("eldersbanner.heading") }}
			</button>
			<button
				v-for="char in currentAlphabet"
				:key="char"
				@click="sortBy(char)"
				:class="selectedChar === char ? 'bg-prime text-white' : ''"
				class="border rounded-md cent p-1 hover:text-white hover:bg-prime">
				{{ char.toUpperCase() }}
			</button>
		</div>

		<div class="h-[0px] -mt-4 border border-gray-300"></div>
		<!-- filterd data  -->

		<div class="-mt-8">
			<template v-if="Object.keys(groupedData).length > 0">
				<div
					v-for="(group, letter, index) in groupedData"
					:key="letter"
					class="grid gap-4">
					<div
						class="w-9 h-9 border rounded-md cent text-white bg-prime"
						v-if="letter">
						<span>{{ letter }}</span>
					</div>
					<div class="tracks__grid">
						<trackAuthor
							v-for="item in group"
							:key="item.id">
							<template v-slot:image>
								<NuxtLink
									:to="localeRoute('/' + item.slug + '/' + item.id)"
									class="">
									<NuxtImg
										:src="item?.img"
										:alt="item?.img_alt"
										class="rounded-md" />
								</NuxtLink>
							</template>
							<template v-slot:title>
								<NuxtLink
									:to="localeRoute('/' + item.slug + '/' + item.id)"
									class="w-full h-full">
									{{ item.title }}
								</NuxtLink>
							</template>
							<template v-slot:share>
								<NuxtLink
									:to="localeRoute('/' + item.slug + '/' + item.id)"
									class="flex justify-center items-center gap-2 shrink-0">
									<img
										src="/public/svgs/headphone.svg"
										alt=" listen"
										class="group-hover:brightness-150" />
									<div class="flex gap-1 items-center max-md:text-sm">
										<span>{{ formatNumber(item?.count_of_watch) }}</span>
										<span>{{ $t("playlistbanner.run") }}</span>
									</div>
								</NuxtLink>
								<PlaylistShare
									:share="production + '/' + locale + '/' + item.slug + '/' + item.id">
									<template v-slot:share>
										{{ production + "/" + locale + "/" + item.slug + "/" + item.id }}
									</template>
								</PlaylistShare>
							</template>
						</trackAuthor>
					</div>
					<div
						class="h-[0px] mb-6 border border-transparent"
						v-if="index !== Object.keys(groupedData).length - 1"></div>
				</div>
			</template>
			<template v-else>
				<div class="text-prime font-semibold text-center">لا يوجد نتائج</div>
			</template>
		</div>
	</div>
</template>

<script setup>
	const production = import.meta.env.VITE_PRODUCTION;
	const localeRoute = useLocaleRoute();

	// get playlist data
	const { locale } = useI18n();
	const dashboard = import.meta.env.VITE_DASHBOARD;
	const playlist = await useFetchWithCache(
		dashboard + "get-playlists?locale=" + (locale.value === "ar" ? locale.value : "en"),
	);

	const props = defineProps({
		playlist: {
			type: Object,
			required: true,
		},
	});
	const items = ref(props.playlist);
	console.log("🚀 ~ playlist.value.result.data :", playlist.value);

	// open modal

	// Sample data

	const arabicAlphabet = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي".split("");
	const englishAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");

	const sortedData = ref([...items.value]);
	const selectedChar = ref("");

	// Function to sort data by a given character
	const sortBy = (char) => {
		const processedChar = char.normalize("NFD").replace(/[\u064b-\u0652]/g, "");
		sortedData.value = items.value
			.filter((item) => {
				const normalizedItemName = item.title
					.normalize("NFD")
					.replace(/[\u064b-\u0652]/g, "")
					.toLowerCase();
				return (
					normalizedItemName.startsWith(processedChar) ||
					(processedChar === "ا" &&
						(normalizedItemName.startsWith("ا") || normalizedItemName.startsWith("أ")))
				);
			})
			.sort((a, b) => a.title.localeCompare(b.title));
		selectedChar.value = char;
		console.log(selectedChar.value);
	};

	const showAll = () => {
		const separatedData = {};

		sortedData.value.forEach((item) => {
			const firstChar = item.title.charAt(0);
			const arabicFirstChar = firstChar.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

			if (!separatedData[arabicFirstChar]) {
				separatedData[arabicFirstChar] = [];
			}

			separatedData[arabicFirstChar].push(item);
		});

		// Sort the grouped data by letters
		const sortedGroupedData = Object.keys(separatedData)
			.sort()
			.reduce((acc, key) => {
				acc[key] = separatedData[key];
				return acc;
			}, {});
		return sortedGroupedData;
	};

	const groupedData = computed(() => {
		const data = showAll();
		return data;
	});

	// Determine the correct alphabet based on the locale
	const currentAlphabet = computed(() => {
		return locale.value === "ar" ? arabicAlphabet : englishAlphabet;
	});

	const showAllData = () => {
		sortedData.value = items.value;
		selectedChar.value = "";
	};

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

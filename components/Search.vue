<template>
	<form class="flex-grow relative">
		<input
			type="search"
			name="search"
			ref="searchInput"
			v-model="searchQuery"
			@input="getSearchResults"
			@change="getSearchResults"
			:placeholder="$t('searchbar.searchtext1')"
			class="w-full focus:border-prime outline-none border-2 rtl:pl-14 ltr:pr-14"
			id="myInput"
			@focus="showList" />
		<button
			id="search"
			aria-label="Activate search"
			title="Activate search">
			<img
				src="/svgs/Search.svg"
				alt="Search icon"
				class="absolute rtl:left-1.5 ltr:right-1.5 top-2 rounded-xl bg-white ltr:scale-x-[-1] transform p-2" />
		</button>
	</form>
	<button
		id="GPS"
		aria-label=" navigation detection "
		title=" navigation detection "
		class="bg-prime size-[45px] rounded-xl cent"
		@click="geolocationPermission === 'granted' ? accept() : toggleModal()">
		<img
			src="/svgs/gps.svg"
			alt=" gps" />
	</button>
	<ul
		id="myUL"
		class="divide-y divide-gray-200 drop-shadow bg-white rounded-xl max-h-56 overflow-y-auto absolute top-20 w-full left-0 right-0 my-1 z-50"
		v-if="countrySearchResults && show">
		<p
			class="py-2"
			v-if="!searchError && countrySearchResults.length === 0">
			No results match your query, try a different term.
		</p>
		<template v-else>
			<NuxtLink
				@click="hideList"
				:to="
					localeRoute(
						'/app/prayer-time/' +
							res.slug_country +
							'/' +
							res.countryCode +
							'/' +
							res.slug_city +
							'/' +
							res.id,
					)
				"
				v-for="res in countrySearchResults"
				:key="res.id">
				<li class="py-2 cursor-pointer flex gap-1 items-center hover:bg-prime hover:text-white">
					<NuxtImg
						v-if="res.image"
						:src="res?.image"
						:alt="res.title_city"
						class="h-7 aspect-square rounded mx-2" />
					<span>
						{{ res.title_city + " &nbsp; - &nbsp; " + res.slug_country }}
					</span>
				</li>
			</NuxtLink>
		</template>
	</ul>

	<LazyModal
		:modalActive="modalActive"
		@close-modal="toggleModal">
		<div
			class="bg-white rounded-[27px] flex gap-6 p-6 md:p-8 items-center justify-center flex-wrap">
			<div>
				<img
					:src="gps"
					alt="mobile GPS"
					class="max-h-[200px] min-h-[100px]" />
			</div>
			<div class="grid md:gap-8 gap-4">
				<h2 class="h__prime max-md:text-center max-w-[450px]">
					{{ $t("location.locationtext") }}
				</h2>
				<p id="demo"></p>
				<div class="flex gap-4 items-center max-md:justify-center whitespace-nowrap">
					<Button
						buttonText="location.buttongreen"
						@click="accept"
						buttonClass="bg-prime text-white btn__prime max-md:text-sm "></Button>
					<Button
						@click="toggleModal"
						buttonText="location.buttonwhite"
						buttonClass=" text-prime btn__prime max-md:text-sm border border-prime "></Button>
				</div>
			</div>
		</div>
	</LazyModal>
</template>

<script setup>
	import gps from "~/assets/images/modal-gps.png";
	const localeRoute = useLocaleRoute();
	import axios from "axios";
	const show = ref(false);
	const searchInput = ref("searchInput");
	function showList() {
		show.value = true;
	}
	function hideList() {
		show.value = false;
	}

	// open modal
	const modalActive = ref(null);
	const toggleModal = () => {
		modalActive.value = !modalActive.value;
	};

	const { locale } = useI18n();

	const domain = import.meta.env.VITE_DASHBOARD_PRAYER;
	const searchQuery = ref("");
	const queryTimeout = ref(null);
	const countrySearchResults = ref(null);
	const searchError = ref(null);
	const getSearchResults = () => {
		clearTimeout(queryTimeout.value);
		queryTimeout.value = setTimeout(async () => {
			if (searchQuery.value !== "") {
				try {
					const result = await axios.get(
						`${domain}get-cities/?title=${searchQuery.value}&locale=${
							locale.value === "ar" ? locale.value : "en"
						}`,
					);
					countrySearchResults.value = result?.data?.result?.cities;
					console.log(result?.data?.result?.cities);
				} catch {
					searchError.value = true;
				}
				return;
			}
			countrySearchResults.value = null;
		}, 500);
	};

	const latitude = ref(0);
	const longitude = ref(0);

	const getLocationApi = () => {
		clearTimeout(queryTimeout.value);
		queryTimeout.value = setTimeout(async () => {
			if (latitude.value && longitude.value) {
				try {
					const result = await axios.get(
						`${domain}get-cities-nearby/?latitude=${latitude.value}&longitude=${
							longitude.value
						}&locale=${locale.value === "ar" ? locale.value : "en"}`,
					);
					countrySearchResults.value = result?.data?.result?.cities;

					if (countrySearchResults.value?.length > 0) {
						searchQuery.value = countrySearchResults.value[0].title_city;
					} else countrySearchResults.value = null;
					searchInput.value.focus();
				} catch {
					searchError.value = true;
				}
				return;
			}
			countrySearchResults.value = null;
		}, 500);
	};

	let accepted = ref(false);

	const accept = () => {
		accepted.value = true;
		getLocation();
	};

	const getLocation = () => {
		if (navigator.geolocation && accepted.value) {
			navigator.geolocation.getCurrentPosition(showPosition);
			modalActive.value = false;
		} else {
			console.error("Geolocation is not supported or permission not granted.");
		}
	};

	const showPosition = (position) => {
		latitude.value = position.coords.latitude;
		longitude.value = position.coords.longitude;
		// Use the latitude and longitude as needed in your app
		getLocationApi();
	};

	const geolocationPermission = ref(null);

	if (process.client) {
		if (navigator.permissions) {
			navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
				geolocationPermission.value = permissionStatus.state;
			});
		} else {
		}
	}
</script>

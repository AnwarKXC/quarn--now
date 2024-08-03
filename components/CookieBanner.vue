<template>
	<div
		class="w-full bg-black/70 backdrop-blur-sm py-6 fixed bottom-0 z-[9999] bg-image drop-shadow"
		v-if="!isCookieAccepted">
		<div class="container relative">
			<p
				class="text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide mb-4 text-center justify-between flex-wrap text-white">
				{{ $t("Weuse") }} <b class="text-sec"> &nbsp;{{ $t("cookies") }}&nbsp; </b>
				{{ $t("cookiebanner.topersonalisecontentandimprove") }}
				<br />
				{{ $t("cookiebanner.youagreetotheouruseofcookies") }}
				<NuxtLink
					class="text-sec cent w-fit mx-auto"
					:to="data?.branding?.link_privacy"
					target="_blank"
					>{{ $t("SeePrivacyPolicy") }}
					<img
						src="/arrow-link.png"
						alt=" link to privacy policy"
						class="invert opacity-50 mx-0.5"
				/></NuxtLink>
			</p>
			<div class="gap-4 mx-auto w-[280px] grid grid-cols-2">
				<button
					class="btn__prime text-white bg-prime hover:bg-teal-700/75 duration-300"
					@click="acceptCookie">
					{{ $t("cookiebanner.accept") }}
				</button>
				<button
					class="btn__prime bg-red-600/70 hover:bg-red-600 duration-300 text-white"
					@click="declineCookie">
					{{ $t("cookiebanner.decline") }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	const { data } = useLandingStore();

	const isCookieAccepted = ref(false);
	const cookie = useCookie("acceptCookie", { default: () => false });
	const route = useRoute();

	isCookieAccepted.value = cookie.value;

	const acceptCookie = () => {
		isCookieAccepted.value = true;
		cookie.value = true;
	};

	const declineCookie = () => {
		isCookieAccepted.value = true;
		cookie.value = false;
	};

	watch(
		() => route.path,
		() => {
			if (!cookie.value) {
				isCookieAccepted.value = false;
			}
		},
	);
</script>

<style scoped>
	.bg-image {
		background-image: url("/file-min.png");
		background-size: 11vw;
		background-position: right bottom;
		background-repeat: no-repeat;
	}

	@media screen and (max-width: 768px) {
		.bg-image {
			background-size: 20vw;
		}
	}
</style>

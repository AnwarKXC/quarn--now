<template>
	<footer
		:style="{ backgroundImage: 'url(' + footerBg + ')' }"
		:class="{ hidden: !footerBg }"
		class="bg-no-repeat bg-cover">
		<div class="pt-10 grid gap-5 bg-black bg-opacity-80">
			<div class="container grid gap-6">
				<div class="text-center cent__col gap-6">
					<Logo />
					<span class="text-white font-medium">{{ $t("footerbanner.logoheading") }}</span>
					<div class="cent gap-4">
						<NuxtLink
							rel="noopener noreferrer"
							to="https://twitter.com/prayer_now_azan"
							><img
								src="/svgs/twiiter.svg"
								alt=" twitter"
						/></NuxtLink>
						<NuxtLink to="https://www.youtube.com/channel/UCy7XsrTZLv_zft9jYhC718g"
							><img
								src="/svgs/youtube.svg"
								alt=" youtube"
						/></NuxtLink>
						<NuxtLink
							rel="noopener noreferrer"
							to="https://instagram.com/prayer_now_azan?utm_medium=copy_link"
							><img
								src="/svgs/instagram.svg"
								alt=" instagram"
						/></NuxtLink>
						<!-- <NuxtLink to="/"

							><NuxtImg   
								src="/svgs/linked.svg"
								alt=" linkedin"
						/></NuxtLink> -->
						<NuxtLink
							to="https://www.facebook.com/PrayerNowMuslims"
							rel="noopener noreferrer"
							><img
								src="/svgs/facebook.svg"
								alt=" facebook"
						/></NuxtLink>
					</div>
				</div>
				<ul class="cent__bet max-sm:justify-center flex-wrap gap-5 text-white">
					<li v-for="(link, index) in data?.footer?.slice(0, 6)">
						<NuxtLink
							:to="link.link"
							class="flex-1"
							>{{ link.title }}</NuxtLink
						>
					</li>
				</ul>
				<div
					v-if="data?.footer"
					class="text-sec cent__bet max-sm:grid grid-cols-2 flex-wrap gap-5 gap-y-12 justify-items-center max-md:my-5">
					<div class="grid gap-3 self-start">
						<NuxtLink
							v-for="link in data?.footer?.slice(6, 9)"
							:to="link.link"
							>{{ link.title }}</NuxtLink
						>
					</div>
					<div class="grid gap-3 self-start">
						<NuxtLink
							v-for="link in data?.footer?.slice(11, 14)"
							:to="link.link">
							{{ link.title }}</NuxtLink
						>
					</div>
					<div class="grid gap-3 self-start">
						<NuxtLink
							v-for="link in data?.footer?.slice(16, 20)"
							:to="link.link">
							{{ link.title }}</NuxtLink
						>
					</div>
					<div class="border-white border !animate-none btn__prime !px-2 w-fit">
						<LangSwitcher
							className="btn__prime !px-3 bg-transparent !animate-none text-white" />
					</div>
				</div>
			</div>
			<div class="w-full h-[.5px] bg-white mt-5"></div>
			<div
				v-if="data?.footer"
				class="container pb-5 cent__bet gap-5 max-md:text-sm">
				<a
					href="#"
					class="font-medium text-white md:hidden flex-1"
					v-if="data?.footer?.mobile_right">
					{{ data?.footer?.mobile_right }}
				</a>
				<a
					:href="data?.branding?.link_download"
					target="_blank"
					class="font-medium text-white max-md:flex-1 hidden md:inline-flex"
					v-if="data?.branding?.copy_rights_info">
					{{ data?.branding?.copy_rights_info }}
				</a>
				<a
					href="#"
					class="font-medium text-white max-sm:flex-1"
					v-if="data?.footer?.left">
					{{ data?.footer?.left }}
				</a>
			</div>
		</div>
	</footer>
</template>

<script setup>
	import footerBg from "~/assets/images/footer-bg.png";

	const store = useLandingStore();
	const data = computed(() => {
		return store.data;
	});

	watchEffect(() => {
	});
</script>

<style scoped></style>

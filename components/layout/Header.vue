<template>

	<header
		class="bg-white sticky top-0 z-[999] shadow-prime py-2 cent w-full min-h-[81.8px]"
		:class="
			route.matched[0].components.default.__name === 'index' ? '' : 'border-b drop-shadow-sm'
		">
		<div class="container cent__bet">
			<!-- toggle button -->
			<button
				class="md:hidden max-md:flex-1"
				@click="toggleModal">
				<img
					src="/svgs/toggel-mobile-header.svg"
					alt="toggel mobile icon header"
					class="" />
			</button>

			<div class="flex gap-8 items-center">
				<div class="max-md:flex-1 cent md:block">
					<!-- Use optional chaining here to prevent accessing properties on potentially null objects -->
					<Logo />
				</div>
				<template v-if="route?.params?.country">
					<div class="relative max-md:hidden">
						<div class="flex items-center gap-[15px]">
							<Search />
						</div>
					</div>
				</template>
			</div>

			<div class="max-md:flex justify-end max-md:flex-1 shrink-0">
				<div class="flex gap-10 items-center">
					<div class="flex items-center md:gap-2 gap-1">
						<span class="shrink-0">
							<img
								src="/svgs/locale.svg"
								alt="search"
								class="" />
						</span>
						<LangSwitcher />
					</div>
					<div class="hidden md:block">
						<!-- Use optional chaining here as well -->
						<NuxtLink
							:to="data?.branding?.link_download"
							target="_blank"
							class="bg-prime text-white btn__prime">
							{{ data?.branding?.title_download }}
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</header>



	<!-- sideBar mobile -->
	<MobileHeaderToggle
		:modalActive="modalActive"
		@close-modal="toggleModal" />
		
</template>

<script setup>
	const route = useRoute();
	const store = useLandingStore();
	const data = computed(() => {
		return store.data;
	});


	// Toggle modal function
	const modalActive = ref(null);
	const toggleModal = () => {
		modalActive.value = !modalActive.value;
	};
</script>

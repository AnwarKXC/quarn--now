<template>
	<Html
		:lang="localeProperties.code"
		:dir="localeProperties.direction">
		<Body class="relative">
			<!-- Google Tag Manager (noscript) -->
			<noscript
				><iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-M44BJZXF"
					height="0"
					width="0"
					style="display: none; visibility: hidden"></iframe
			></noscript>
			<!-- End Google Tag Manager (noscript) -->
			<NuxtLoadingIndicator color="#E5AC2E" />
			<NuxtPwaManifest />
			<LazyDownloadPopup />
			<LayoutHeader> </LayoutHeader>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
			<LazyPlayBar />
			<LayoutFooter />
			<LazyCookieBanner />
		</Body>
	</Html>
</template>
<script setup>
	import { useHead, useSeoMeta } from "nuxt/app";

	const { localeProperties } = useI18n();
	const { changeDataAr, changeDataEn } = useLandingStore();

	const domain = import.meta.env.VITE_DOMAIN;
	const landing = import.meta.env.VITE_LANDING_PAGE;
	const ar = await useFetchWithCache(`${domain}${landing}ar`);
	const en = await useFetchWithCache(`${domain}${landing}en`);
	changeDataAr(ar.value);
	changeDataEn(en.value);



</script>

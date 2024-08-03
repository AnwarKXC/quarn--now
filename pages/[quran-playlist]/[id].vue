<template>
	<div class="grid gap-6">
		<PlayListPanner :playlist="playlist?.result[0] || {}" />

		<QuranSearchSection :playlist="playlist?.result[0] || {}" />

		<!-- <NewPlayListSection /> -->

		<!--  ads 1 -->
		<Add1 />

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
	const playlist = await useFetchWithCache(
		dashboard +
			"get-single-playlist?id=" +
			route.params.id +
			"&locale=" +
			(locale.value === "ar" ? locale.value : "en"),
	);
	const seo = playlist.value?.result[0]?.seo_data?.seo;
	if (playlist.value) {
		useHead({
			title: seo.metaTitle,
			meta: [
				{ hid: "description", name: "description", content: seo.metaDescription },
				{ hid: "keywords", name: "keywords", content: seo.keywords },
				{ hid: "robots", name: "robots", content: seo.metaRobots },
				{ hid: "og:title", property: "og:title", content: seo.metaSocial?.title },
				{
					hid: "og:description",
					property: "og:description",
					content: seo.metaSocial?.description,
				},
				{
					hid: "og:image",
					property: "og:image",
					content: seo.metaSocial.image,
				},

				{ hid: "og:type", property: "og:type", content: "website" },
				{ hid: "og:url", property: "og:url", content: seo.canonicalURL },
				{ hid: "twitter:title", name: "twitter:title", content: seo.metaTitle },
				{
					hid: "twitter:description",
					name: "twitter:description",
					content: seo.description,
				},
				{ hid: "canonical", rel: "canonical", href: seo.canonicalURL },
			],
			script: [
				{
					type: "application/ld+json",
					children: JSON.stringify(seo.structuredData),
				},
			],
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

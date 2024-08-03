<template>
	<div class="grid gap-6">
		<!-- Google Add 1 -->
		<!-- <div>
      <NuxtImg    class="w-full h-[244px] rounded-xl border border-gray-300"
        src="https://via.placeholder.com/909x244" />
    </div> -->

		<QuranMainSection :playlist="playlist.result.data" />

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
	// get playlist data
	const { locale } = useI18n();
	const dashboard = import.meta.env.VITE_DASHBOARD;
	const playlist = await useFetchWithCache(
		dashboard + "get-playlists?locale=" + (locale.value === "ar" ? locale.value : "en"),
	);

	const seo = playlist.value?.result?.seo?.seo_data?.seo;
	if (playlist.value) {
		useHead({
			title: seo.metaTitle,
			meta: [
				{ hid: "description", name: "description", content: seo.metaDescription },
				{ hid: "keywords", name: "keywords", content: seo.keywords },
				{ hid: "robots", name: "robots", content: seo.metaRobots },
				{ hid: "viewport", name: "viewport", content: seo.metaViewport },
				{ hid: "og:title", property: "og:title", content: seo.metaSocial?.title },
				{ hid: "og:image", property: "og:image", content: seo?.metaImage },
				{
					hid: "og:description",
					property: "og:description",
					content: seo.metaSocial[0]?.description,
				},

				{ hid: "og:type", property: "og:type", content: "website" },
				{ hid: "og:url", property: "og:url", content: seo.canonicalURL },
				{ hid: "twitter:title", name: "twitter:title", content: seo.metaTitle },
				{
					hid: "twitter:description",
					name: "twitter:description",
					content: seo.metaDescription,
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

		ogTitle: seo.metaSocial.metaTitle,
		ogImage: seo.metaSocial.metaImage,
	});
</script>

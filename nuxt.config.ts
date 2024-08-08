import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
		},
	},

	nitro: {
		compressPublicAssets: true,
		prerender: {
			routes: ["/", "/app/quran", "/app/prayer-time"],
		},
	},
	modules: [
		[
			"@nuxtjs/i18n",
			{
				vueI18n: "./locales/i18n.config.ts",
				defaultLocale: "ar",
				strategy: "prefix",
				detectBrowserLanguage: {
					useCookie: true,
				},
				locales: [
					{
						code: "en",
						iso: "en-US",
						name: "English",
						file: "./locales/en.json",
						direction: "ltr",
					},
					{
						code: "ar",
						iso: "ar",
						name: "Arabic",
						file: "./locales/ar.json",
						direction: "rtl",
					},
					{
						code: "fr",
						iso: "fr",
						name: "French",
						file: "./locales/fr.json",
						direction: "ltr",
					},
					{
						code: "indo",
						iso: "id",
						name: "Indonesia",
						file: "./locales/indo.json",
						direction: "ltr",
					},
					{
						code: "turk",
						iso: "tr",
						name: "Turkish",
						file: "./locales/turk.json",
						direction: "ltr",
					},
				],
			},
		],
		[
			"nuxt-aos",
			{
				disable: false,
				startEvent: "DOMContentLoaded",
				initClassName: "aos-init",
				animatedClassName: "aos-animate",
				useClassNames: false,
				disableMutationObserver: false,
				debounceDelay: 50,
				throttleDelay: 99,
				offset: 120,

				delay: 0,
				duration: 400,
				easing: "ease",
				once: false,
				mirror: false,
				anchorPlacement: "top-bottom",
			},
		],
		["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
		[
			"@nuxt/image",
			{
				format: ["webp"],
				quality: 50,
			},
		],
		"nuxt-swiper",
	],

	runtimeConfig: {
		public: {
			gtagId: "G-C9ERJLM3PP",
		},
	},
	imports: { dirs: ["./composables", "./stores"] },
	css: ["./assets/main.css"],

	devtools: { enabled: true },

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});

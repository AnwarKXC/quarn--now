export const useLandingStore = defineStore("landing", () => {
	const { locale } = useI18n();

	const ar = ref({});
	const en = ref({});
	const arSEO = ref({});
	const enSEO = ref({});

	const changeDataAr = ( newData ) => {
		
		ar.value = newData.data.attributes;
		arSEO.value = newData.data.meta;

	};

	const changeDataEn = (newData) => {
		en.value = newData.data.attributes;
		enSEO.value = newData.data.meta;
	};

	const data = computed(() => (locale.value === "ar" ? ar.value : en.value));

	return {
		data,
		changeDataAr,
		changeDataEn,
	};
});

// HMR
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useLandingStore, import.meta.hot));
}

<template>
	<NuxtImg
		
		:src="isrc"
		:class="iclass"
		:alt="ialt"
	 />
</template>

<script setup>
	const props = defineProps({
		isrc: {
			type: [String, Number],
			default: "",
		},
		iclass: {
			type: [String, Number],
			default: "",
		},
		ialt: {
			type: [String, Number],
			default: () => "Image",
		},
	})
</script>

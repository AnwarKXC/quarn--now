<template>
	<th class="px-4 font-normal text-start" :class=" thClass ">{{ $t( thText ) }} <slot/></th>
</template>

<script setup>
const props = defineProps( {
	thText: {
		type: String,
		default: "",
	},
	thClass: {
		type: [ String, Number ],
		default: "",
	},
} )
</script>

<style  scoped></style>
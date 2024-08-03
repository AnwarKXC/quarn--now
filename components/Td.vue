<template>
	<td class=" px-3">
		<div :class=" tdClass ">
			<slot />
		</div>
	</td>
</template>

<script setup>
const props = defineProps( {
	tdClass: {
		type: [ String, Number ],
		default: "",
	},
} )
</script>

<style  scoped></style>
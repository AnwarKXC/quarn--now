<script setup>
	const switchLocalePath = useSwitchLocalePath()

	defineProps({
		className: {
			type: String,
			default: "",
		},
	})
</script>

<template>
	<label for="local"></label>
	<select name="local"
		id="local"
		aria-label="local"
		title="local"
		:class="className"

		v-model="$i18n.locale"



		@change="navigateTo(switchLocalePath($event.target.value))">
		<option value="en">English</option>
		<option value="ar">العربية</option>
		<option value="fr">French</option>
		<option value="indo">Indonesia</option>
		<option value="turk">Turkish</option>
	</select>
</template>

<style scoped></style>

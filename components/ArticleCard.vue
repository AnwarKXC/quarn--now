<template>
	<div
		class=" grid grid-rows-5 bg-white rounded-xl border border-gray-300 size-full overflow-hidden drop-shadow-sm" 		data-aos="fade-up"
		data-aos-delay="0"
		data-aos-duration="500"
		data-aos-offset="200"
		data-aos-easing="ease-in-out"
		data-aos-mirror="true">
		<div class=" row-span-3">
			<slot name="image" />
		</div>
		<div class="row-span-2 grid gap-2 p-3">
			<div class=" text-zinc-800 text-lg truncate">
				<slot name="title" class="text-center" />
			</div>
			<div class=" text-sm text-zinc-500 line-clamp-3">
				<slot name="paragraph" class="" />
			</div>
		</div>
	</div>
</template>

<script setup>

</script>

<style  scoped></style>
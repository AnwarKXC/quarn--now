<template>
	<div  data-aos="fade-up"
		data-aos-delay="0"
		data-aos-duration="500"
		data-aos-offset="100"
		data-aos-easing="ease-in-out"
		data-aos-mirror="true" 
		class=" w-full bg-white rounded-xl border border-gray-300 grid grid-cols-5 gap-5 p-3">
		<div class=" cent ">
			<slot name="image" />
		</div>
		<div class=" flex items-center col-span-4">
			<div class="grid ">
				<div class=" text-zinc-800 font-semibold max-md:text-[13px]">
					<slot name="title" />
				</div>
				<div class=" text-neutral-400 max-md:text-xs ">
					<slot name="by" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

</script>

<style scoped></style>
<template> 
	<div data-aos="fade-up"
		data-aos-delay="0"
		data-aos-duration="500"
		data-aos-offset="100"
		data-aos-easing="ease-in-out"
		data-aos-mirror="true" 
		class=" w-full  bg-white rounded-xl border border-gray-300 flex items-center md:gap-3 gap-1.5 p-2 hover:bg-prime group">
		<div class=" cent md:size-[68px] size-[52px] ">
			<slot name="image" />
		</div>
		<div class=" flex items-center flex-grow">
			<div class="grid md:gap-1 w-full ">
				<div
					class="group-hover:text-neutral-200 text-zinc-800 font-semibold max-md:text-[12.5px]">
					<slot name="title" />
				</div>
				<div
					class=" flex justify-between gap-4 w-full group-hover:text-neutral-400 text-neutral-500">
					<slot name="share">

					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

</script>

<style scoped></style>
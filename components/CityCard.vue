<template>
	<div
		class="w-full h-full rounded-lg border border-gray-200 p-2 grid grid-rows-3 justify-center items-center hover:bg-prime duration-300 hover:text-white hover:drop-shadow text-[#333333]">
		<div class="row-span-2 p-1 gap-2 overflow-hidden max-w-[90px] mx-auto drop-shadow-xl">
			<div
				class="overflow-hidden rounded-full"
			>
				<slot name="image" />
			</div>
		</div>
		<p class="text-center text-sm">
			<slot
				name="text"
				class="text-center" />
		</p>
	</div>
</template>

<script setup></script>

<style scoped></style>

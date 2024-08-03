<template>
	<div class=" overflow-x-auto">
		<table
			class="overflow-hidden rounded-xl w-full text-xs whitespace-nowrap mb-0.5 drop-shadow-sm ">
			<thead>
				<tr class=" bg-prime text-white h-[33px] ">
					<slot name="thead" />
				</tr>
			</thead>
			<tbody class="text-zinc-800">
				<slot name="tbody">
				</slot>
			</tbody>
		</table>
	</div>
</template>

<script setup>

</script>

<style scoped></style>
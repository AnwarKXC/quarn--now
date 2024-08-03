<script setup>
	import LeftSideBar from "~/components/layout/LeftSideBar.vue";
	import RightSideBar from "~/components/layout/RightSideBar.vue";
</script>

<template>
	<div>
		<div class="main__layout container py-6 relative">
			<div class="hidden md:block">
				<RightSideBar />
			</div>

			<slot />
			<div class="hidden lg:block">
				<LeftSideBar />
			</div>
		</div>
	</div>
</template>

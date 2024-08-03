<template>
	<div class=" bg-white rounded-xl grid gap-6 py-6 px-4 border border-gray-200">

		<h2 class="h__prime">
			{{ $t( 'moreplaybanner.heading' ) }}
		</h2>
		<div class="playlist__grid">
			<PlayListCard v-for="  index in 6          " :key=" index ">
				<template #image>
					<Image isrc="/play-bar.png" ialt="logo" iclass="h-full rounded" />
				</template>
				<template #title>
					<div class="flex items-center justify-between md:gap-2 gap-1">
						<span>قائمة تشغيل قرأن جديدة</span>
						<span class=" cent md:gap-2 gap-1 shrink-0">
							<img  src="/svgs/play-primary.svg" alt=" play" class=" md:size-5 size-4"/>
							<span class="text-prime  font-medium max-sm:text-[10px]">
								<span> 200
								</span>تشغيل</span>
						</span>
					</div>
				</template>
				<template #by>
					ماهر المعيقلي
				</template>

			</PlayListCard>
		</div>
	</div>
</template>

<script setup>

</script>

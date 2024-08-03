<template>
	<div class="bg-white rounded-xl border border-gray-200 px-4 py-6 grid gap-6">
		<h2 class="h__prime">{{ $t("trendingbanner.heading") }}</h2>
		<div class="popular__articles__grid">
			<ArticleCard
				v-for="index in 3"
				:key="index">
				<template v-slot:image>
					<NuxtImg
						class="w-full h-full"
						src="https://via.placeholder.com/266x185" />
				</template>
				<template v-slot:title> المحافظة على أخوة الدين </template>
				<template v-slot:paragraph>
					فما أصاب المسلمين اليوم من التأخر وقد كانوا فيما مضى سادة العام نتيجة للتفرق
					والاختلاف وركونهم إلى الدنيا وزخارفها والاشتغال
				</template>
			</ArticleCard>
		</div>
	</div>
</template>

<script setup></script>

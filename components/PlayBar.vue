 <template>
	<div class="sticky bottom-0 z-[9999]">
		<div
			class="w-full bg-prime md:py-2.5 py-1 drop-shadow shadow-prime md:min-h-[75px] flex items-center z-[9999]"
			v-if="title">
			<div class="container flex justify-between items-center gap-y-2 gap-8 flex-wrap">
				<div class="flex items-center gap-3">
					<div>
						<NuxtImg
							:src="store.img"
							alt=" track image"
							class="md:size-[64px] size-[48px] rounded" />
					</div>
					<div class="divide-y divide-transparent grid">
						<nuxt-link
							:to="localeRoute(`/${slug}/${id}`)"
							class="text-white md:text-[22px] font-bold font-['Almarai']"
							>{{ playlist }}
						</nuxt-link>
						<nuxt-link
							:to="
								localeRoute(
									'/' +
										slug +
										'/' +
										store.currentTrack.slug +
										'/' +
										store.currentTrack.track_id,
								)
							"
							class="text-zinc-300 md:text-lg text-sm font-normal hover:brightness-150 duration-300">
							{{ title }}
						</nuxt-link>
					</div>
				</div>
				<!-- (B) AUDIO PLAYERS -->
				<PlayControl :url="url" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useQuranStore } from "~/stores/quranStore";
	const localeRoute = useLocaleRoute();

	const store = useQuranStore();
	const { url, playlist, title, img, slug, id } = storeToRefs(store);
</script>

<style scoped></style>

<template>
	<Teleport
		to="body"
		:dir="dir">
		<Transition name="modal-outer">
			<div
				v-show="modalActive"
				:dir="dir"
				class="bg-black bg-opacity-80 fixed inset-0 md:hidden"
				@click="$emit('close-modal')">
				<Transition name="modal-inner">
					<div
						v-if="modalActive"
						class="backdrop-blur-[1px] h-full">
						<div
							class="bg-gray-200 drop-shadow-lg p-4 w-[280px] max-w-[450px] sm:w-3/5 flex flex-col gap-5 h-full overflow-y-auto hide__scroll">
							<div class="flex justify-between">
								<Logo />
								<button class="">
									<img
										src="/svgs/close-mobile-toggel.svg"
										alt="close"
										class=" size-6" />
								</button>
							</div>
							<NavLinks />
							<LayoutRightSideBar />
						</div>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
	import { ref, watch } from "vue"
	defineEmits(["close-modal"])
	const props = defineProps({
		modalActive: {
			type: Boolean,
			default: false,
		},
		logo: {
			type: String,
			default: "",
		},
	})

	const { locale } = useI18n()
	const dir = ref(locale.value === "ar" ? "rtl" : "ltr")

	watch(locale, (newValue, oldValue) => {
		if (newValue !== oldValue) {
			dir.value = newValue === "ar" ? "rtl" : "ltr"
		}
	})
</script>

<style scoped>
	.modal-outer-enter-active {
		transition: opacity 0.1s cubic-bezier(0.52, 0.02, 0.19, 1.02);
	}

	.modal-outer-leave-active {
		transition: opacity 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02);
	}

	.modal-outer-enter-from {
		opacity: 0.5;
	}

	.modal-outer-leave-to {
		opacity: 1;
	}

	.modal-inner-enter-active {
		transition: all 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0s;
	}

	.modal-inner-leave-active {
		transition: all 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02);
	}

	.modal-inner-enter-from {
		opacity: 0;
		transform: translateX(100%);
	}

	.modal-inner-leave-to {
		transform: translateX(100%);
	}

	[dir="ltr"] .modal-inner-enter-from,
	[dir="ltr"] .modal-inner-leave-to {
		transform: translateX(-100%);
	}
</style>

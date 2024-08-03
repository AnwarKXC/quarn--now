<template>
	<Teleport to="body">
		<Transition name="modal-outer">
			<div :dir=" dir " v-show=" modalActive "
				class=" w-full bg-black  bg-opacity-80   fixed inset-0 z-[9999]">
				<Transition name="modal-inner">
					<div v-if=" modalActive " class=" z-50 backdrop-blur-[1px] p-4 cent h-full">
						<slot />
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
const { locale } = useI18n()
const dir = ref( locale.value === 'ar' ? 'rtl' : 'ltr' )


defineEmits( [ "close-modal" ] )
const props = defineProps( {
	modalActive: {
		type: Boolean,
		default: false,
	},
} )





</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
	transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
	opacity: 0;
}

.modal-inner-enter-active {
	transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
	transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
	opacity: 0;
	transform: scale(0.8);
}

.modal-inner-leave-to {
	transform: scale(0.8);
}
</style>

<template>
	<div class="flex justify-center items-center gap-5 shrink-0 py-2">
		<div
			v-if="showCopyMessage"
			class="text-slate-600 text-xs group-hover:text-slate-200">
			تم النسخ
		</div>
		<button
			v-else
			@click="copyTitle">
			<img
				src="/svgs/copy.svg"
				alt=" copy image"
				class="group-hover:brightness-150 hover:scale-110 duration-200 md:size-5 size-4" />
			<div
				class="hidden"
				ref="titleToCopy">
				<slot name="share" />
			</div>
		</button>

		<button @click="toggleModal">
			<img
				src="/svgs/share.svg"
				alt="share image "
				class="group-hover:brightness-150 duration-200 hover:scale-110 md:size-5 size-4" />
		</button>
	</div>
	<Modal
		:modalActive="modalActive"
		@close-modal="toggleModal">
		<div
			class="bg-white rounded-[27px] gap-8 p-6 md:p-8 grid flex-wrap md:min-w-[450px] max-w-[576px]">
			<div class="flex justify-between gap-4 items-center">
				<div class="text-prime text-base font-bold font-['Almarai'] leading-tight">مشاركة</div>
				<button @click="toggleModal">
					<img
						src="/svgs/close.svg"
						alt=" close image" />
				</button>
			</div>
			<div class="share__modal__grid">
				<NuxtLink
					:to="item.link"
					target="_blank"
					v-for="(item, index) in share"
					:key="index"
					class="grid gap-2 justify-items-center">
					<div
						:class="
							'size-[72px] max-md:size-[50px] ' +
							item.bgColor +
							' bg-opacity-[13%] rounded-full cent'
						">
						<NuxtImg
							:src="item.icon"
							alt=" icon vector" />
					</div>
					<div class="text-prime text-xs font-normal font-['Inter'] leading-[15px]">
						{{ item.label }}
					</div>
				</NuxtLink>
			</div>
			<div
				class="text-center text-slate-600 text-opacity-50 text-xs font-bold font-['Almarai'] leading-[15px]">
				أو مشاركة الرابط
			</div>
			<div
				class="h-[53px] bg-neutral-400 bg-opacity-5 rounded-2xl flex justify-between items-center px-4 overflow-hidden">
				<div
					class="text-slate-600 text-opacity-50 text-sm font-normal font-['Inter'] line-clamp-1 overflow-x-auto hide__scroll text-left"
					dir="ltr"
					ref="titleToCopy">
					<slot name="share" />
				</div>
				<div class="shrink-0 rtl:pr-3 ltr:pl-3">
					<div
						v-if="showCopyMessage"
						class="text-slate-600 text-xs">
						تم النسخ !
					</div>
					<button
						v-else
						@click="copyTitle">
						<img
							src="/svgs/copy-alt.svg"
							alt=" copy image" />
					</button>
				</div>
			</div>
		</div>
	</Modal>
</template>

<script setup>
	import { ref } from "vue";
	import Modal from "./Modal.vue"; // Adjust the path based on your project structure

	// Define props and other reactive variables
	const props = defineProps({
		share: {
			type: String,
			default: "",
		},
	});

	const modalActive = ref(null);

	const share = [
		{
			icon: "/svgs/alternate_email.svg",
			label: "E-mail",
			bgColor: "bg-sec",
			link: `mailto:?subject=Check%20out%20this%20awesome%20content&body=Here%20is%20the%20link%20to%20the%20content%3A%20${props.share}`,
		},
		{
			icon: "/svgs/whatsapp.svg",
			label: "Whatsapp",
			bgColor: "bg-slate-600",
			link: `https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20content:${props.share}`,
		},
		{
			icon: "/svgs/twitter-alt.svg",
			label: "Twitter",
			bgColor: "bg-slate-600",
			link: `https://twitter.com/intent/tweet?url=${props.share}&text=Check%20out%20this%20awesome%20content`,
		},
		{
			icon: "/svgs/telegram-alt.svg",
			label: "Telegram",
			bgColor: "bg-slate-600",
			link: `https://t.me/share/url?url=${props.share}&text=Check%20out%20this%20awesome%20content`,
		},
		{
			icon: "/svgs/comment.svg",
			label: "Facebook",
			bgColor: "bg-slate-600",
			link: `https://www.facebook.com/sharer/sharer.php?u=${props.share}`,
		},
		// { icon: "/svgs/alternate_share.svg", label: "المزيد", bgColor: "bg-slate-600", link: '#' } // Placeholder for additional sharing options
	];

	// Toggle modal function
	const toggleModal = () => {
		modalActive.value = !modalActive.value;
	};

	// Function to copy title
	const titleToCopy = ref(null);
	const showCopyMessage = ref(false);

	const copyTitle = () => {
		const title = titleToCopy.value.innerText;
		navigator.clipboard
			.writeText(title)
			.then(() => {
				showCopyMessage.value = true;
				setTimeout(() => {
					showCopyMessage.value = false;
				}, 2000); // Hide message after 2 seconds
			})
			.catch((error) => {
				console.error("Failed to copy title: ", error);
			});
	};
</script>

<style scoped>
	/* Your component's scoped styles */
</style>

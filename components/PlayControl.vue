<template>
	<div class="flex-grow">
		<div
			v-for="(audioPlayer, index) in audioPlayers"
			:key="index"
			class="flex items-center md:gap-8 gap-3 justify-end text-white">
			<div class="flex gap-3 flex-grow">
				<!-- Volume Control -->
				<div class="relative group shrink-0">
					<input
						class="maxmd:hidden p-0 absolute group-hover:block right-0 left-0 bottom-9 hidden h-24"
						style="writing-mode: vertical-lr; direction: rtl"
						type="range"
						min="0"
						max="1"
						step="0.1"
						v-model="audioPlayer.volume"
						@input="setVolume(audioPlayer)" />
					<button @click="toggleMute(audioPlayer)">
						<img
							class="mt-[5px] w-[26px] h-[26px]"
							:src="

								audioPlayer.volume == 0
									? '/svgs/Icon-Volume-mute.svg'
									: '/svgs/Icon-Volume.svg'
							"
							alt=" toggle mute" />
					</button>
				</div>
				<!-- Progress Bar -->
				<input
					type="range"
					min="0"
					:max="audioPlayer.totalDuration"
					step="1"
					v-model="audioPlayer.currentTime"
					@input="setProgress(audioPlayer)"
					class="!p-0 lg:min-w-96 md:min-w-54 w-full rotate-180 progress flex-grow"
					:style="{ backgroundSize: progressBackgroundSize }" />
			</div>
			<!-- Play/Pause Button -->
			<div class="flex md:gap-4 gap-2 items-center ltr:flex-row-reverse shrink-0">
				<button @click="store.nextTrack()">
					<img
						src="/svgs/Icon-Forwardsvg.svg"
						alt=" next" />
				</button>
				<button
					class="w-10 cent"
					@click="store.togglePlay()">
					<img
						v-if="store.status"
						src="/svgs/Icon-Pause.svg"
						alt=" pause"
						class="max-md:w-4" />
					<img

						v-else
						src="/svgs/Icon-Play.svg"
						alt=" play"
						class="max-md:w-6" />
				</button>

				<button @click="store.prevTrack()">
					<img
						src="/svgs/Icon-Rewindsvg.svg"
						alt=" rewind" />
				</button>
			</div>

			<div
				class="text-neutral-300 font-sm flex items-center gap-3 shrink-0 max-md:order-first max-md:hidden"
				v-if="props.url">
				<span class="w-9">{{ timeString(audioPlayer.currentTime) }}</span> /
				<span class="w-9">{{ timeString(audioPlayer.totalDuration) }}</span>
			</div>
			<div v-else></div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, computed, watch, watchEffect } from "vue"
	const props = defineProps({
		url: {
			type: String,
			default: "",
		},
	})

	import { useQuranStore } from "~/stores/quranStore"
	const store = useQuranStore()
	const onPropsChanged = () => {
		audioPlayers.value.forEach((player) => {
			player.src = props.url
			if (player.audio) {
				player.audio.src = player.src
			}
		})
	}
	watch(() => props.url, onPropsChanged)

	const audioPlayers = ref([
		{ src: store.url, audio: null, currentTime: 0, totalDuration: 0, volume: 1, seeking: false },
	])
	const timeString = (secs) => {
		let ss = Math.floor(secs),
			hh = Math.floor(ss / 3600),
			mm = Math.floor((ss - hh * 3600) / 60)
		ss = ss - hh * 3600 - mm * 60
		mm = mm < 10 ? "0" + mm : mm
		ss = ss < 10 ? "0" + ss : ss
		return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
	}

	watch(
		() => store.status,
		(newValue) => {
			if (newValue) {
				audioPlayers.value[0].audio.play()
				audioPlayers.value[0].isPlaying = true
			} else {
				audioPlayers.value[0].audio.pause()
				audioPlayers.isPlaying = false
			}
		},
	)

	const isPaused = (audioPlayer) => {
		if (audioPlayer.audio) {
			return audioPlayer.audio.paused
		}
		return true // Assuming that if audio is not initialized, it's considered paused
	}
	const toggleMute = (audioPlayer) => {
		audioPlayer.volume = audioPlayer.volume == 0 ? 1 : 0
		if (audioPlayer.audio) {
			audioPlayer.audio.volume = audioPlayer.volume
		}
	}

	const setVolume = (audioPlayer) => {
		if (audioPlayer.audio) {
			audioPlayer.audio.volume = audioPlayer.volume
		}
	}
	const setProgress = (audioPlayer) => {
		if (audioPlayer.audio) {
			audioPlayer.audio.currentTime = audioPlayer.currentTime
		}
	}

	const forwardSong = () => {
		if (audioPlayers.value[0].audio) {
			audioPlayers.value[0].audio.currentTime += 20 // Forwarding by 10 seconds, change as needed
		}
	}
	const rewindSong = () => {
		if (audioPlayers.value[0].audio) {
			audioPlayers.value[0].audio.currentTime -= 20 // Rewinding by 10 seconds, change as needed
		}
	}

	const setupMediaSession = () => {
		if ("mediaSession" in navigator) {
			navigator.mediaSession.setActionHandler("play", () => {
				if (!store.status) store.togglePlay() // Only toggle if not already playing
			})

			navigator.mediaSession.setActionHandler("pause", () => {
				if (store.status) store.togglePlay() // Only toggle if currently playing
			})

			navigator.mediaSession.setActionHandler("previoustrack", () => {
				store.prevTrack()
			})

			navigator.mediaSession.setActionHandler("nexttrack", () => {
				store.nextTrack()
			})

			navigator.mediaSession.setActionHandler("seekbackward", (details) => {
				rewindSong(details.seekOffset || 10) // Default to 10 seconds if no seekOffset provided
			})

			navigator.mediaSession.setActionHandler("seekforward", (details) => {
				forwardSong(details.seekOffset || 10) // Default to 10 seconds if no seekOffset provided
			})
		}
	}

	// Keydown Event Handler
	const handleKeyDown = (event) => {
		event.preventDefault() // Prevent the default action for the key press

		switch (event.key) {
			case " ":
			case "Spacebar":
			case "MediaPlayPause":
				store.togglePlay()
				break
			case "ArrowRight":
				forwardSong()
				break
			case "ArrowLeft":
				rewindSong()
				break
			case "ArrowUp":
				store.nextTrack()
				break
			case "ArrowDown":
				store.prevTrack()
				break
			default:
				// Do nothing for other keys
				break
		}
	}

	// Component Mounted Hook
	onMounted(() => {
		window.addEventListener("keydown", handleKeyDown)

		setupMediaSession()

		if (process.browser) {
			for (const player of audioPlayers.value) {
				player.audio = new Audio(encodeURI(player.src))
				player.audio.addEventListener("loadedmetadata", () => {
					player.totalDuration = Math.floor(player.audio.duration)
					player.audio.addEventListener("timeupdate", () => {
						if (!player.seeking) {
							player.currentTime = Math.floor(player.audio.currentTime)
						}
					})
				})
				player.audio.addEventListener("seeking", () => {
					player.seeking = true
				})
				player.audio.addEventListener("seeked", () => {
					player.seeking = false
				})
				player.audio.addEventListener("ended", () => {
					store.nextTrack() // Call store.nextTrack() when the audio track ends
				})
			}
		}
	})

	// Optional cleanup to remove event listeners when the component is unmounted

	// Optional cleanup to remove event listeners when the component is unmounted

	const progressBackgroundSize = computed(() => {
		const progress = audioPlayers.value[0].currentTime / audioPlayers.value[0].totalDuration
		return `${progress * 100}% 100%`
	})
	watchEffect(() => {
		audioPlayers.value[0].src = props.url

		if (audioPlayers.value[0].audio) {
			audioPlayers.value[0].audio.src = props.url
			audioPlayers.value[0].audio.pause()
			audioPlayers.value[0].isPlaying = false
			audioPlayers.value[0].audio.play()
			audioPlayers.value[0].isPlaying = true
			// If the audio is playing, pause it when the URL changes
			if (!audioPlayers.value[0].audio.paused) {
				audioPlayers.value[0].audio.pause()
				audioPlayers.value[0].isPlaying = false
				audioPlayers.value[0].audio.play()
				audioPlayers.value[0].isPlaying = true
			}
		}
	})
</script>

<style scoped>
	input[type="range"] {
		accent-color: rgb(235, 235, 235);
	}

	.progress {
		-webkit-appearance: none;
		appearance: none;
		margin-block: auto;
		height: 7px;
		border: none;
		background: rgb(160, 160, 160);
		border-radius: 50px;
		background-image: linear-gradient(90deg, #ffffff, #ffffff);
		background-repeat: no-repeat;
		background-position-x: right;
		@apply duration-[1500ms];
	}

	.progress:hover {
		background-image: linear-gradient(90deg, #ffffff, #42867b);
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 0px;
		width: 0px;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
		transition: background 0.3s ease-in-out;
	}
</style>

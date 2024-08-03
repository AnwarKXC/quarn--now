export const useQuranStore = defineStore( "quran", () => {
	const url = ref( '' )
	const title = ref( '' )
	const playlist = ref( '' )
	const img = ref( '' )
	const status = ref( true )
	const tracks = ref( [] )
	const currentTrack = ref( {} )
	const currentIndex = ref( 0 )
	const slug = ref( '' )
	const id = ref( '' )

	function togglePlay() {
		status.value = !status.value
	}


	function play( currentTrack ) {
		url.value = currentTrack.url
		title.value = currentTrack.title
		img.value = currentTrack.img_url || currentTrack.img
		status.value = true
	}

	function selectTrack( data, playL, index, pSlug, pId ) {
		currentIndex.value = index
		tracks.value = data
		playlist.value = playL
		slug.value = pSlug
		id.value = pId
		currentTrack.value = tracks.value[ index ]
		play( currentTrack.value )
	}


	function nextTrack() {
		if ( currentIndex.value === tracks.value.length - 1 ) {
			currentIndex.value = 0
		} else {
			currentIndex.value = currentIndex.value + 1
		}
		currentTrack.value = tracks.value[ currentIndex.value ]
		play( currentTrack.value )
	}


	function prevTrack () {
		if ( currentIndex.value === 0 ) {
			currentIndex.value = tracks.value.length - 1
		}else{
			currentIndex.value = currentIndex.value - 1
		}
		currentTrack.value = tracks.value[ currentIndex.value ]
		play( currentTrack.value )
	}


	return {
		url,
		title,
		status,
		playlist,
		img,
		currentTrack,
		slug,
		id,
		togglePlay,
		play,
		selectTrack,
		nextTrack,
		prevTrack
	}
} )



// HMR
if (
	import.meta.hot ) {
	import.meta.hot.accept( acceptHMRUpdate( useQuranStore,
		import.meta.hot ) )
}
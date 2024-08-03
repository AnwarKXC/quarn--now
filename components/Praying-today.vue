<template>
	<div class="overflow-x-auto w-full " v-if=" props.data[ 0 ] && props.data[ 0 ].timings ">
		<div
			class="w-full overflow-x-auto bg-yellow-50 rounded-xl border border-sec flex justify-between whitespace-nowrap items-center px-">
			<div v-for="(             prayer, index             ) in              prayerTimes             "
				:key=" index " class="cent__col gap-1 py-2 min-w-[110px] px-5 flex-1 "
				:class=" { 'bg-sec ': nextPrayerIndex === index } ">
				<template v-if=" nextPrayerIndex === index ">
					<Image :isrc=" `/svgs/${ prayer?.icon_inverted }.svg` " :ialt=" prayer?.name "
						iclass="w-10 h-10" />
				</template>

				<template v-else>
					<Image :isrc=" `/svgs/${ prayer.icon }.svg` " :ialt=" prayer?.name "
						iclass="w-10 h-10" />
				</template>
				<div :class=" { '!text-white ': nextPrayerIndex === index } "
					class=" text-zinc-500 text-sm font-normal font-['Almarai'] leading-tight">
					{{
		$t( prayer.translation ) }}</div>
				<div :class=" { '!text-white ': nextPrayerIndex === index } "
					class=" text-zinc-800 text-base font-medium font-['Roboto'] leading-tight">
					{{ extractTime( props.data[ 0 ].timings[ prayer.key ] ) || '–' }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps( {
	data: {
		type: Object,
		default: [],
	},
} )

const prayerTimes = [
	{ key: 'Fajr', name: 'Fajr', icon: 'fajr', icon_inverted: 'fajr', translation: 'infobanner.time1' },
	{ key: 'Sunrise', name: 'Sunrise', icon: 'sunrise', icon_inverted: 'sunrise', translation: 'infobanner.time2' },
	{ key: 'Dhuhr', name: 'Dhuhr', icon: 'dhuhr', icon_inverted: 'dhuhr', translation: 'infobanner.time3' },
	{ key: 'Asr', name: 'Asr', icon: 'asr', icon_inverted: 'asr-inverted', translation: 'infobanner.time4' },
	{ key: 'Maghrib', name: 'Maghrib', icon: 'maghrib', icon_inverted: 'maghrib-inverted', translation: 'infobanner.time5' },
	{ key: 'Isha', name: 'Isha', icon: 'isha', icon_inverted: 'isha', translation: 'infobanner.time6' }
]

const nextPrayerIndex = computed( () => {
	for ( let i = 0; i < prayerTimes.length; i++ ) {
		if ( isNextPrayer( i ) ) {
			return i
		}
	}
	return 0 // Return -1 if no next prayer is found
} )

function isNextPrayer ( index ) {
	const now = new Date()
	const currentHours = now.getHours()
	const currentMinutes = now.getMinutes()
	const nextPrayer = prayerTimes[ index ]
	const match = props.data[ 0 ].timings[ nextPrayer.key ].match( /(\d{2}):(\d{2})/ )
	const prayerHours = parseInt( match[ 1 ], 10 )
	const prayerMinutes = parseInt( match[ 2 ], 10 )

	const currentTimeInMinutes = currentHours * 60 + currentMinutes
	const prayerTimeInMinutes = prayerHours * 60 + prayerMinutes

	// Compare the prayer time with the current time
	return prayerTimeInMinutes > currentTimeInMinutes
}

function extractTime ( str ) {
	// Define a regular expression pattern to match the time part
	const pattern = /(\d{2}:\d{2})/
	// Use the exec method of the regular expression to extract the time
	const match = pattern.exec( str )
	// Return the matched time or an empty string if no match found
	return match ? match[ 0 ] : ''
}

</script>

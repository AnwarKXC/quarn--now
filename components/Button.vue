<template>
  <button :class=" buttonClass ">{{ $t( buttonText ) }}</button>
</template>
  
<script setup>

const props = defineProps( {
  buttonText: {
    type: String,
    default: "Button",
  },
  buttonClass: {
    type: [ String, Number ],
    default: "",
  },
} )

</script>
  
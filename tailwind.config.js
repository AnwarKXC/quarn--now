/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
   ],
   colorMode: {
      preference: 'light'
   },
   theme: {
      extend: {
         container: {
            center: true,
            padding: ".75rem",
         },
         colors: {
            prime: "#1E4D45",
            sec: "#E5AC2E",
            yellow: {
               50: "#FFF8E6",
            },
            gray: {
               200: "#E8E9EB",
            },
            brown: '#54442E'
         },
         screens: {
            "max-3xl": {
               max: "1535px"
            },
            "max-2xl": {
               max: "1279px"
            },
            "max-xl": {
               max: "1150px"
            },
            "max-lg": {
               max: "1023px"
            },
            "max-md": {
               max: "767px"
            },
            "max-sm": {
               max: "639px"
            },
            "max-xs": {
               max: "480px"
            },
            "max-xxs": {
               max: "340px"
            },
         },
      },
   },
   plugins: [],
}
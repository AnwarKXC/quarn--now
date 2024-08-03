import ar from "./ar.json"
import en from "./en.json"
import fr from "./fr.json"
import indo from "./indo.json"
import turk from "./turk.json"
export default defineI18nConfig(() => ({
   legacy: false,
   locale: "ar",
	fallbackLocale: 'ar',
   messages: {
      en,
      ar,
      fr,
		indo,
		turk,
   },
}))

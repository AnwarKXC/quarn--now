
// @ts-nocheck
import locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_en_json from "../locales/en.json";
import locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_ar_json from "../locales/ar.json";
import locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_fr_json from "../locales/fr.json";
import locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_indo_json from "../locales/indo.json";
import locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_turk_json from "../locales/turk.json";


export const localeCodes =  [
  "en",
  "ar",
  "fr",
  "indo",
  "turk"
]

export const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => Promise.resolve(locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_en_json), cache: true }],
  "ar": [{ key: "../locales/ar.json", load: () => Promise.resolve(locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_ar_json), cache: true }],
  "fr": [{ key: "../locales/fr.json", load: () => Promise.resolve(locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_fr_json), cache: true }],
  "indo": [{ key: "../locales/indo.json", load: () => Promise.resolve(locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_indo_json), cache: true }],
  "turk": [{ key: "../locales/turk.json", load: () => Promise.resolve(locale_E_58_E_58_programing_prayer_32time_32v2_32__32Copy_locales_turk_json), cache: true }]
}

export const vueI18nConfigs = [
  () => import("../locales/i18n.config.ts?hash=91504c8a&config=1" /* webpackChunkName: "__locales_i18n_config_ts_91504c8a" */)
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "./locales/i18n.config.ts",
  "locales": [
    {
      "code": "en",
      "iso": "en-US",
      "name": "English",
      "direction": "ltr",
      "files": [
        "locales/en.json"
      ]
    },
    {
      "code": "ar",
      "iso": "ar",
      "name": "Arabic",
      "direction": "rtl",
      "files": [
        "locales/ar.json"
      ]
    },
    {
      "code": "fr",
      "iso": "fr",
      "name": "French",
      "direction": "ltr",
      "files": [
        "locales/fr.json"
      ]
    },
    {
      "code": "indo",
      "iso": "id",
      "name": "Indonesia",
      "direction": "ltr",
      "files": [
        "locales/indo.json"
      ]
    },
    {
      "code": "turk",
      "iso": "tr",
      "name": "Turkish",
      "direction": "ltr",
      "files": [
        "locales/turk.json"
      ]
    }
  ],
  "defaultLocale": "ar",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix",
  "lazy": false,
  "langDir": null,
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "iso": "en-US",
    "name": "English",
    "direction": "ltr",
    "files": [
      {
        "path": "locales/en.json"
      }
    ]
  },
  {
    "code": "ar",
    "iso": "ar",
    "name": "Arabic",
    "direction": "rtl",
    "files": [
      {
        "path": "locales/ar.json"
      }
    ]
  },
  {
    "code": "fr",
    "iso": "fr",
    "name": "French",
    "direction": "ltr",
    "files": [
      {
        "path": "locales/fr.json"
      }
    ]
  },
  {
    "code": "indo",
    "iso": "id",
    "name": "Indonesia",
    "direction": "ltr",
    "files": [
      {
        "path": "locales/indo.json"
      }
    ]
  },
  {
    "code": "turk",
    "iso": "tr",
    "name": "Turkish",
    "direction": "ltr",
    "files": [
      {
        "path": "locales/turk.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"

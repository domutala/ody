export default defineNuxtConfig({
  extends: ["docus"],

  modules: ["@nuxtjs/i18n"],

  css: ["~/assets/styles/main.css"],

  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "fr",
        name: "Français",
      },
    ],
  },
});

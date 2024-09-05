// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [['@nuxtjs/google-fonts', {
    families: {
      "Nunito": [200, 400, 600, 800],
      download: true,
      inject: true
    },
  
  }
  ], '@pinia/nuxt']
})

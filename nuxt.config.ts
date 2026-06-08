// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    tokenSecret: process.env.TOKEN_SECRET || 'default-secret-change-in-production',
    tokenExpiration: process.env.TOKEN_EXPIRES || '7d',
    tokenName: process.env.TOKEN_NAME || '__session',
    public: {}
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/design-tokens.css'],
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    },
    pageTransition: { name: 'fade', mode: 'out-in' }
  },
  compatibilityDate: '2024-01-01'
})

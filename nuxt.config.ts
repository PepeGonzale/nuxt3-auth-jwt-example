// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys (only available on server-side)
    tokenSecret: process.env.TOKEN_SECRET || 'default-secret-change-in-production',
    tokenExpiration: process.env.TOKEN_EXPIRES || '7d',
    tokenName: process.env.TOKEN_NAME || '__session',
    // Public keys (exposed to client-side)
    public: {
      // Add any public runtime config here if needed
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-01-01'
})

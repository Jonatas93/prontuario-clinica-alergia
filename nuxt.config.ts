export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },
  typescript: {
    strict: true
  },
  experimental: {
    // Necessário no Windows com ssr:false — garante que NUXT_VITE_NODE_OPTIONS
    // seja setado imediatamente via Vite Environment API em vez de aguardar
    // o hook vite:serverCreated do servidor SSR (que nunca dispara em modo SPA)
    viteEnvironmentApi: true
  },
  // Fix para Windows: usa porta TCP em vez de Unix socket para HMR
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 24678
      }
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'AllergyMed — Prontuário Eletrônico',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sistema de prontuário eletrônico para clínica de alergologia' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})


export default {
  mode: 'spa',
  env: {
    GOOGLE_BOOKS_API_URL: process.env.GOOGLE_BOOKS_API_URL || 'https://www.googleapis.com/books/v1',
    GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY,
    TMDB_API_URL: process.env.TMDB_API_URL || 'https://api.themoviedb.org/3',
    TMDB_API_KEY: process.env.TMDB_API_KEY
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ef7567' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/app-style.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/filters.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/dotenv', { systemvars: true }],
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/Developmint/nuxt-purgecss
    'nuxt-purgecss',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:1337/'
  },
  router: {
    // middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: `auth/local`, method: 'post', propertyName: 'jwt' },
          logout: false,
          user: { url: `users/me`, method: 'get', propertyName: false }
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },
  purgeCSS: {
    enabled: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    extractCSS: true
  }
}

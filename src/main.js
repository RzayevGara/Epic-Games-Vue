import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.sass'
import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})
const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.provide("commerce", commerce);
app.mount('#app')

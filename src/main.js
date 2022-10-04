import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.sass'
import Commerce from '@chec/commerce.js';

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;


const app = createApp(App)
app.use(router)
app.use(store)
app.provide("commerce", commerce);
app.mount('#app')


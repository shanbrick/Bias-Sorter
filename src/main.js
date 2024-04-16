import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebasePlugin from './firebase-plugin.js'

createApp(App).
    use(router).
    use(firebasePlugin).
    mount('#app');
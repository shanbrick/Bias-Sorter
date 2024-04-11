import { createApp } from 'vue'
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire';
import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebase';

createApp(App).
    use(router).
    use(VueFire, {
        firebaseApp,
        modules: [
            VueFireAuth(),
            VueFireFirestoreOptionsAPI(),
        ]
    }).
    mount('#app');
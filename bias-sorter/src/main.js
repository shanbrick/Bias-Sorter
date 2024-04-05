import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXwVLvCEe0ay_vuh_G01Ps1NAuZ1hW6vk",
    authDomain: "kpop-bias-sorter.firebaseapp.com",
    projectId: "kpop-bias-sorter",
    storageBucket: "kpop-bias-sorter.appspot.com",
    messagingSenderId: "429069438243",
    appId: "1:429069438243:web:6560831b6ab4bef4a29096"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')

const db = getFirestore(App)

export {
    db
}
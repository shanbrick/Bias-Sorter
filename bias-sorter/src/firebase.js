import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCXwVLvCEe0ay_vuh_G01Ps1NAuZ1hW6vk",
    authDomain: "kpop-bias-sorter.firebaseapp.com",
    projectId: "kpop-bias-sorter",
    storageBucket: "kpop-bias-sorter.appspot.com",
    messagingSenderId: "429069438243",
    appId: "1:429069438243:web:6560831b6ab4bef4a29096"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const usersRef = collection(db, 'users')

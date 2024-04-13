import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXwVLvCEe0ay_vuh_G01Ps1NAuZ1hW6vk",
    authDomain: "kpop-bias-sorter.firebaseapp.com",
    projectId: "kpop-bias-sorter",
    storageBucket: "kpop-bias-sorter.appspot.com",
    messagingSenderId: "429069438243",
    appId: "1:429069438243:web:6560831b6ab4bef4a29096"
};

// initialize firebase app
firebase.initializeApp(firebaseConfig);

// create firestore db
const db = firebase.firestore()

export default {
  install: (app) => {
    // expose firebase variables so that all vue components can access them at will
    app.config.globalProperties.$firebase = firebase;
    app.config.globalProperties.$db = db;
  }
};
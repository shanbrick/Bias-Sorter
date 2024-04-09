<template>
  <div class="navBar">
    <nav>
      <router-link class="navButtons" to="/">Home</router-link>
      <router-link class="navButtons" to="/list">Lists</router-link>
      <router-link class="navButtons" to="/groups">Groups</router-link>
      <router-link class="navButtons" to="/birthdays">Birthdays</router-link>
      <button v-if="isLoggedIn" class="signInOut" @click="handleSignOut">Sign Out</button>
      <button v-else class="signInOut" @click="signinPopup">Sign In</button>
    </nav>
  </div>
  <div class="header">
    <p class="headerTitle">Bias Sorter</p>
    <div>
      <div class="auto">
        <SearchAutocomplete :items="groups" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import groupListEdit from "@/groupListEdit.json";
import SearchAutocomplete from "./components/SearchAutocomplete.vue";

import { ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
// const router = useRouter();
let auth;

export default {
  name: "App",
  components: {
    SearchAutocomplete,
  },
  data() {
    return {
      search: "",
      groups: groupListEdit,
      isLoggedIn: ref(false),
      router: useRouter(),
    };
  },
  methods: {
    handleSignOut() {
      signOut(auth).then(() => {
        this.router.push("/");
      });
    },
  },
  mounted() {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      console.log(this.isLoggedIn);
    });
  },
};
</script>

<script setup>
import { ref } from "vue";
import { signInWithPopup, signOut } from "firebase/auth";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { googleAuthProvider } from "@/firebase";

const auth = useFirebaseAuth(); // only exists on client side

// display errors if any
const error = ref(null);
function signinPopup() {
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error("Failed signinRedirect", reason);
    error.value = reason;
  });
}
</script>

<style>
#app {
  background: white;
  color: black;
  font-family: Trebuchet MS;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0px;
}

nav {
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
}

.navBar {
  background-color: #747fe6;
  color: white;
  padding: 5px;
  text-align: center;
}

.navButtons {
  border-radius: 5px;
  color: white;
  display: block;
  float: left;
  font-weight: bold;
  margin: 5px;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
}

.signInOut {
  background-color: #747fe6;
  border: 1px solid #747fe6;
  border-radius: 5px;
  color: white;
  float: right;
  font-family: Trebuchet MS;
  font-size: 16px;
  font-weight: bold;
  margin: 5px;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
}

.navButtons:hover {
  background-color: #505cc7;
  color: white;
  cursor: pointer;
}

.signInOut:hover {
  background-color: #505cc7;
  color: white;
  cursor: pointer;
}

input {
  background-color: #ffffff;
  border: 1px solid #50a0d900;
  border-radius: 5px;
  color: black;
  font-family: Trebuchet MS;
  font-size: 15px;
  font-weight: 500;
  margin: 6px 10px 10px;
  padding: 7px;
  width: 350px;
}

.header {
  align-items: center;
  background-image: linear-gradient(#b3b8e9, #747fe6);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin: 0px;
  text-align: center;
}

.headerTitle {
  float: left;
  font-size: 35px;
  font-weight: 800;
  line-height: 20px;
  margin-left: 30px;
}

.auto {
  float: right;
  margin: auto;
  margin-right: 30px;
  position: relative;
  width: 350px;
  z-index: 2;
}
</style>

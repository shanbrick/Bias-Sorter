<template>
  <div class="navBar">
    <nav>
      <router-link class="navButtons" to="/">Home</router-link>
      <router-link class="navButtons" to="/list">Bias Lists</router-link>
      <router-link class="navButtons" to="/groupList">Group Lists</router-link>
      <router-link class="navButtons" to="/groups">Groups</router-link>
      <router-link class="navButtons" to="/birthdays">Birthdays</router-link>
      <router-link class="navButtons" to="/spreadsheet">Spreadsheet</router-link>
      <button v-if="isLoggedIn" class="signInOut" @click="handleSignOut">Sign Out</button>
      <button v-else class="signInOut" @click="signinPopup">Sign In</button>
      <v-lazy-image v-if="isLoggedIn" class="pfp" :src="currUser.photoURL" />
      <p v-if="isLoggedIn" class="greeting">
        <i>Logged in as:</i> {{ currUser.displayName }}
      </p>
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

  <button class="topBtn" @click="toTop" id="topBtn">⬆</button>
</template>

<script>
import groupListEdit from "@/groupListEdit.json";
import SearchAutocomplete from "./components/SearchAutocomplete.vue";
import VLazyImage from "v-lazy-image";

import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const error = ref(null);

export default {
  name: "App",
  components: {
    SearchAutocomplete,
    VLazyImage,
  },
  data() {
    return {
      search: "",
      groups: groupListEdit,
      isLoggedIn: ref(false),
      router: useRouter(),
      currUser: {},
    };
  },
  created() {
    window.addEventListener("scroll", this.scrollFunction);
  },
  unmounted() {
    window.removeEventListener("scroll", this.scrollFunction);
  },
  methods: {
    handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.router.push("/");
      });
    },
    scrollFunction() {
      let mybutton = document.getElementById("topBtn");
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    },
    toTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    signinPopup() {
      const auth = getAuth();
      const googleAuthProvider = new GoogleAuthProvider();
      signInWithPopup(auth, googleAuthProvider).catch((reason) => {
        console.error("Failed signinRedirect", reason);
        error.value = reason;
      });
    },
    async initialize() {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      this.currUser = currentUser;
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.initialize();
      } else {
        this.isLoggedIn = false;
      }
      console.log(this.isLoggedIn);
    });

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = this.scrollFunction();
  },
};
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
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
}

.pfp {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  float: right;
  width: 28px;
  vertical-align: middle;
  border-radius: 30px;
  margin: 5px 10px;
  padding: 0px;
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

.greeting {
  float: right;
  font-size: 16px;
  line-height: 9px;
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

.topBtn {
  background-color: #747fe6;
  border: 1px solid #747fe6;
  border-radius: 5px;
  bottom: 20px;
  box-shadow: 0px 0px 5px black;
  color: white;
  cursor: pointer;
  display: none;
  font-size: 20px;
  font-weight: bolder;
  padding: 10px 13px 8px;
  position: fixed;
  right: 20px;
  z-index: 9999;
}

.topBtn:hover {
  background-color: #505cc7;
  border: 1px solid #505cc7;
}
</style>

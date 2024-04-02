<template>
  <div class="navBar">
    <nav v-if="isLoggedIn">
      <router-link class="navButtons" to="/home">Home</router-link>
      <router-link class="navButtons" to="/boy-groups">Boy Groups</router-link>
      <router-link class="navButtons" to="/girl-groups">Girl Groups</router-link>
      <router-link class="navButtons" to="/solo">Solo</router-link>
      <router-link class="navButtons" to="/birthdays">Birthdays</router-link>
      <button @click="handleSignOut">Sign out</button>
    </nav>
  </div>
  <div class="header">
    <p>Bias Sorter</p>
    <div class="auto">
      <SearchAutocomplete :items="groups" />
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

.navButtons:hover {
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
  width: 300px;
}

.header {
  background-image: linear-gradient(#b3b8e9, #747fe6);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  text-align: center;
}

.header p {
  float: left;
  font-size: 35px;
  font-weight: 800;
  line-height: 20px;
  margin-left: 30px;
}

.auto {
  float: right;
  margin: auto;
  margin-right: 15px;
  position: relative;
  width: 300px;
  z-index: 2;
}
</style>

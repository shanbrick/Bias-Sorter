<template>
  <div class="header">
    <h1>Bias Sorter</h1>
    <nav>
      <router-link class="navButtons" to="/">Home</router-link>
      <router-link class="navButtons" to="/boy-groups">Boy Groups</router-link>
      <router-link class="navButtons" to="/girl-groups">Girl Groups</router-link>
      <router-link class="navButtons" to="/solo">Solo</router-link>

      <div class="auto">
        <SearchAutocomplete :items="groups" />
      </div>
    </nav>
  </div>
  <router-view />
</template>

<script>
import groupListEdit from "@/groupListEdit.json";
import SearchAutocomplete from "./components/SearchAutocomplete.vue";

export default {
  name: "App",
  components: {
    SearchAutocomplete,
  },
  data() {
    return {
      search: "",
      groups: groupListEdit,
    };
  },
  methods: {},
};
</script>

<style>
#app {
  font-family: Trebuchet MS;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background: #ffffff;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0px;
}

nav {
  overflow: hidden;
  font-weight: bold;
  font-size: 16px;
}

.navButtons {
  float: left;
  display: block;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
}

.navButtons:hover {
  background-color: #505cc7;
  color: white;
  cursor: pointer;
}

input {
  /* float: right; */
  width: 300px;
  margin-right: 10px;
  margin-top: 6px;
  font-weight: 500;
  font-size: 15px;
  font-family: Trebuchet MS;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  border: 1px solid #50a0d900;
  background-color: #ffffff;
  padding: 7px;
}

.header {
  padding: 15px;
  padding-bottom: 5px;
  text-align: center;
  background: #b3b8e9;
  background-image: linear-gradient(#b3b8e9, #747fe6);
  color: white;
}

.header h1 {
  margin-left: 10px;
  font-size: 35px;
  line-height: 20px;
  font-weight: 800;
}

.auto {
  float: right;
  width: 300px;
  z-index: 1;
}
</style>

<template>
  <div class="header">
    <h1>Bias Sorter</h1>
  </div>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/boy-groups">Boy Groups</router-link>
    <router-link to="/girl-groups">Girl Groups</router-link>
    <router-link to="/solo">Solo</router-link>
    <input class="right" type="text" placeholder="Search...">
  </nav>
  <router-view />
</template>

<script>
import groupList from '@/groupList.json'

export default {
  name: "App",
  data() {
    return { groupData: groupList };
  },
  methods: {
    
  },
}
</script>

<style>
#app {
  font-family: Trebuchet MS;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background: #ededed;
}

* {
  box-sizing: border-box;
}

nav {
  overflow: hidden;
  background-color: #b3b8e9;
  font-weight: bold;
  font-size: 16px;
}

nav a {
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

.nav a:hover {
  background-color: #8d91b7;
}

nav a.router-link-exact-active {
  color: white;
}

input {
  float: right;
  margin-right: 10px;
  margin-top: 6px;
  font-weight: 500;
  font-size: 15px;
  font-family: Trebuchet MS;
  color: white;
  border-radius: 5px;
  border-color: #50a0d900;
  background-color: #8d91b7;
  padding: 7px;
}

.header {
  padding: 5px;
  text-align: center;
  background: #b3b8e9;
  color: white;
}

.header h1 {
  margin-left: 10px;
  font-size: 35px;
  line-height: 20px;
  font-weight: 800;
}
</style>

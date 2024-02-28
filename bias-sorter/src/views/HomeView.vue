<!-- <p v-if="name === 'Alex'">Cool name!!!</p>
<div v-else>
  <img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</div>
<div v-for="person in people">
  <p>{{ person.name }}</p>
</div> 
<p>Name: {{ name }}</p>
<button @click="changeName">Change name</button>
-->

<template>
  <div id="unsorted" class="unsorted">
    <div class="boxHeaderUnsorted">
      <p class="categoryTitle">Unsorted</p>
      <p class="idolName" v-for="person in unsortedArray">{{ person.groupName }}</p>
    </div>
  </div>

  <div id="ult" class="categories">
    <div class="boxHeaderCategories">
      <p class="categoryTitle">Ults</p>
    </div>
  </div>

  <div id="semi" class="categories">
    <div class="boxHeaderCategories">
      <p class="categoryTitle">Semis</p>
    </div>
  </div>

  <div id="reg" class="categories">
    <div class="boxHeaderCategories">
      <p class="categoryTitle">Regs</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import groupList from '@/groupList.json'
import unsortedArray from './GroupPageView.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  props: [

  ],
  mounted() {

  },
  data() {
    return {
      groupData: groupList
    }
  },
  computed: {

  },
  methods: {
    changeName() {
      this.name = 'Alex'

      this.people = [...this.people, { name: 'Alex' }]
    }
  }
}
</script>

<style scoped>
.unsorted {
  height: 60%;
  width: 342px;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  /* disable horizontal scroll */
  background-color: #ffffff;
  border-bottom: 1px solid #B0B0B0;
  border-left: 1px solid #B0B0B0;
  border-right: 1px solid #B0B0B0;
  padding: 10px;
  padding-left: 0px;
  padding-right: 0px;
  margin: 20px;
  margin-top: 65px;
  border-radius: 0px 0px 10px 10px;
}

.boxHeaderUnsorted {
  height: 45px;
  width: 342px;
  background-color: #b3b8e9;
  border-top: 1px solid #B0B0B0;
  border-left: 1px solid #B0B0B0;
  border-right: 1px solid #B0B0B0;
  border-radius: 10px 10px 0px 0px;
  padding-left: 20px;
  margin-top: -55px;
  margin-left: -1px;
  margin-bottom: 15px;
  position: fixed;
}

.categories {
  margin: 20px;
  margin-left: 387px;
  margin-top: 65px;
  position: relative;
  background-color: #ffffff;
  padding: 10px;
  padding-left: 0px;
  padding-right: 0px;
  border-radius: 0px 0px 10px 10px;
  border-bottom: 1px solid #B0B0B0;
  border-left: 1px solid #B0B0B0;
  border-right: 1px solid #B0B0B0;
}

.categoryTitle {
    top: -8px;
    position: absolute;
    z-index: 1;
    color: white;
    font-size: 20px;
    font-weight: 700;
}

.categories:after {
  content: "";
  display: table;
  clear: both;
}

.boxHeaderCategories {
  height: 45px;
  background-color: #b3b8e9;
  border-top: 1px solid B0B0B0;
  border-left: 1px solid #B0B0B0;
  border-right: 1px solid #B0B0B0;
  border-radius: 10px 10px 0px 0px;
  padding: 20px;
  margin-top: -55px;
  /*padding categories + boxheader height*/
  margin-bottom: 10px;
  margin-left: -1px;
  /* categories padding*/
  margin-right: -1px;
  position: relative;
}

.idolName {
  text-align: center;
  font-size: 15px;
  margin: 5px;
  font-weight: bold;
  color: black;
}
</style>

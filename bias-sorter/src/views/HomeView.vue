<template>
  <div class="home">
    <p>Name: {{ name }}</p>
    <button @click="changeName">Change name</button>
    <p v-if="name === 'Alex'">Cool name!!!</p>
    <div v-else>
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>

    <div v-for="person in people">
      <p>{{ person.name }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  props: [

  ],
  mounted() {
    console.log("hi shannon!!!!!! isn't vue fun?")
  },
  data: () => {
    return {
      name: 'Shannon',
      people: [
        { name: 'Juliet'},
        { name: 'Shan'}
      ]
    }
  },
  computed: {

  },
  methods: {
    changeName() {
      this.name = 'Alex'

      this.people = [ ...this.people, { name: 'Alex' }]
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <button @click="seila"></button>
  <div>{{ teste }}</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref}  from 'vue';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    let teste = ref("teste");
    function seila(){
      alert("seila");
    }
    return {
      teste,
      seila
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

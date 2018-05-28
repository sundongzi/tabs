<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="count++">Add 1</button>
    <p>{{count}}</p>
  </div>
</template>

<script>
export default {
  tabName: 'hello',
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      count: 1
    }
  },
  components: {
    Test: () => import('@/components/Router-A')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

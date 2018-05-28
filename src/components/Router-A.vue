<template>
  <div>
    <div>This is Router-A</div>
    <router-link to="/index/router-a/test">test</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'router-a'
}
</script>

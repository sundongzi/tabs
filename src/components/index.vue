<template>
  <div>
    <keep-alive :include="includeArr">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Bus from 'vue-happy-bus'
export default {
  name: 'index',
  data () {
    return {
      // 用于 keep-alive 的缓存组件
      includeArr: []
    }
  },
  created () {
    const bus = Bus(this)
    bus.$on('tab-list-change', (tabRouters = []) => {
      this.includeArr = tabRouters.map(val => val.name)
    })
  }
}
</script>

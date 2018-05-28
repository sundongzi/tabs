<template>
  <div id="app">
    <el-row>
      <el-col :span="4" class="menus">
        <el-menu
          :default-active="currentRoute"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item v-for="item in menuList" :key="item.name"  :index="item.name" @click="menusClick(item)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.alias}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="container" v-show="tabRoutes.length > 0">
          <el-tabs v-model="currentRoute" @tab-click="tabClick" @tab-remove="tabRemove" type="card">
            <el-tab-pane v-for="item in tabRoutes" :key="item.name" :label="item.alias" :name="item.name" closable></el-tab-pane>
          </el-tabs>
          <router-view></router-view>
        </div>
        <div v-show="tabRoutes.length === 0">
          <h3>啥也没有啊</h3>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Bus from 'vue-happy-bus'
export default {
  name: 'App',
  data () {
    return {
      tabRoutes: [], // 存放 tab 列表
      currentRoute: '', // 当前选择的 tab 路由
      menuList: [
        {
          alias: 'Hello',
          name: 'hello',
          path: '/index/hello'
        },
        {
          alias: 'Router-A',
          name: 'router-a',
          path: '/index/router-a'
        },
        {
          alias: 'Router-B',
          name: 'router-b',
          path: '/index/router-b'
        },
        {
          alias: 'Router-C',
          name: 'router-c',
          path: '/index/router-c'
        },
        {
          alias: 'Router-D',
          name: 'router-d',
          path: '/index/router-d'
        },
        {
          alias: 'Router-E',
          name: 'router-e',
          path: '/index/router-e'
        },
        {
          alias: 'Router-F',
          name: 'router-f',
          path: '/index/router-f'
        }
      ]
    }
  },
  watch: {
    tabRoutes (newVal) {
      Bus.$emit('tab-list-change', JSON.parse(JSON.stringify(newVal)))
    }
  },
  methods: {
    menusClick (item) {
      if (!this.tabRoutes.includes(item)) {
        this.tabRoutes.push(item)
      }
      this.toLink(item)
    },
    toLink (item) {
      this.currentRoute = item.name || item
      this.$router.push({
        name: this.currentRoute
      })
    },
    tabClick (component) {
      this.toLink(component.name)
    },
    // 删除 tab
    tabRemove (tabName) {
      // 如果删除的不是当前选择的 tab
      if (this.currentRoute !== tabName) {
        // 排除被删除的 tab
        this.tabRoutes = this.tabRoutes.filter(val => val.name !== tabName)
      } else {
        let currentIndex = -1
        this.tabRoutes = this.tabRoutes.filter((val, index) => {
          // 记录当前被删除 tab 的下标位置，因为 el-tab 插件的问题，回调函数只能传递 tab name，只能自己算下标
          if (val.name === tabName) {
            currentIndex = index
          }
          return val.name !== tabName
        })
        if (this.tabRoutes.length === currentIndex) {
          // if 条件满足说明当前被选中删除的 tab 是最后一个，下标-1 取过删除后数组的最后一个 tab
          currentIndex--
        }
        // 如果 currentIndex = -1 说明当前 tab 列表中已经没有了
        if (currentIndex === -1) {
          this.currentRoute = ''
          this.$router.push('/')
          return
        }
        this.toLink(this.tabRoutes[currentIndex].name)
      }
    }
  },
  created () {
    let initTabRoute = () => {
      const initRoute = this.menuList.filter(val => val.name === this.$route.name)[0]
      if (initRoute) {
        this.tabRoutes.push(initRoute)
        this.currentRoute = initRoute.name
      }
    }
    if (this.$route.path !== location.pathname) {
      // 如果当前 vue-route 中的 path 与 location 中的 path 不一致，
      // 说明为初始化路由中的组件时异步组件
      // ps:（异步组件会有一个异步请求的过程，只有在组件请求回来后路由才加载完毕，所以这时候获取的 path 只是'/'）
      // 开启 $route 的监听
      const unWatch = this.$watch('$route', newVal => {
        initTabRoute()
        // 取消监听
        unWatch()
        initTabRoute = null
      })
    } else {
      // 同步路由
      initTabRoute()
      initTabRoute = null
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menus{
  text-align: left;
}

.container {
  margin-left: 20px;
}
</style>

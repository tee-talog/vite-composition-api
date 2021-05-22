<template>
  <header class="header">
    <router-link class="logo" to="/">へっだー</router-link>
  </header>

  <div class="wrapper">
    <nav class="nav">
      <router-view name="nav"></router-view>
    </nav>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MemberNav from './components/CategoryNav.vue'
import MemberList from './components/BookList.vue'

export default defineComponent({
  name: 'App',
  components: {
    MemberNav,
    MemberList,
  },
})
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html,
body {
  height: 100%;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
}

.header {
  height: 60px;
  width: 100%;
  background: #fee;
  border-bottom: solid 1px #bbb;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 200px;
}
.logo:hover {
  background: #edd;
}

.nav {
  width: 200px;
  border-right: solid 1px #bbb;
}

.main {
  flex-grow: 1;
}
</style>

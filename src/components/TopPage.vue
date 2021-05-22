<template>
  <div class="topPage">Top Page!</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopPage',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.topPage {
  text-align: center;
  font-size: 30px;
  margin: 50px;
}
</style>

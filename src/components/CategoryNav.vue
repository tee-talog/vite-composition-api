<template>
  <ul v-if="isInitialized" class="bookNav">
    <li class="item" v-for="category in categories" :key="category.id">
      <router-link class="link" :to="`/categories/${category.id}/books`">
        {{ category.name }}
      </router-link>
    </li>
  </ul>

  <div v-else-if="isError">Error!</div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue'
import useCategories from '../modules/categories'

export default defineComponent({
  name: 'BookNav',
  setup() {
    const { state, isError, fetchCategories } = useCategories()

    const isInitialized = ref(false)
    onMounted(async () => {
      await fetchCategories()
      isInitialized.value = true
    })

    return { ...toRefs(state), isError, isInitialized }
  },
})
</script>

<style lang="scss" scoped>
.bookNav {
  list-style: none;
  padding: 0;
}

.item {
  background: #fafafa;
}
.item:hover {
  background: #eef;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>

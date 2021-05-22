<template>
  <div class="bookList">
    <ul v-if="isInitialized" class="list">
      <li class="item" v-for="book in books" :key="book.id">
        <router-link
          class="link"
          :to="`/categories/${categoryId}/books/${book.id}`"
          :title="book.description"
        >
          {{ book.name }}
        </router-link>
      </li>
    </ul>

    <div v-else-if="isError">Error!</div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import useBooks from '../modules/books'

export default defineComponent({
  name: 'BookList',
  setup() {
    const route = useRoute()

    const getCategoryId = () => route.path.split('/')[2]
    const categoryId = computed(() => getCategoryId())

    const { state, isError, fetchBooks } = useBooks()

    // API アクセスでページのデータを取得
    // isError を含めた初期化処理を Nuxt の useFetch で簡単に処理できるから楽だったんだなぁ
    const isInitialized = ref(false)
    const unwatch = watch(
      () => route.path,
      async () => {
        await fetchBooks(getCategoryId())
        isInitialized.value = true
      },
      { immediate: true }
    )
    onBeforeRouteLeave(() => unwatch())

    return { isInitialized, ...toRefs(state), isError, categoryId }
  },
})
</script>

<style lang="scss" scoped>
.bookList {
}

.list {
  list-style: none;
  padding: 0;
}

.item:nth-child(2n) {
  background: #fafafa;
}

.item:hover {
  background: #eef;
}

.link {
  display: block;
  padding: 20px;
}
</style>

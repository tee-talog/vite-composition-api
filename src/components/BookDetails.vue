<template>
  <div class="bookDetails">
    <!-- なんかここらへんの書き方うまくいってないきがする -->
    <div v-if="!isInitialized">Loading...</div>
    <div v-else-if="isError">Error!</div>

    <template v-else>
      <h1>{{ book.name }}</h1>
      <p>{{ book.description }}</p>
      <p>著者：{{ book.author }}</p>
      <p>{{ book.publicationDate }}出版</p>
      <p>{{ book.page }}ページ</p>
    </template>

    <div>
      <router-link v-if="prevPath" :to="prevPath">前へ</router-link>
      <router-link v-if="nextPath" :to="nextPath">次へ</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

import useBook from '../modules/book'
import useBooks from '../modules/books'

export default defineComponent({
  name: 'BookDetails',
  setup() {
    const defaultBook = {
      id: 1,
      name: '',
      description: '',
      author: '',
      publicationDate: '',
      page: 0,
      categoryId: '',
    }

    const route = useRoute()
    const { state, isError, fetchBookDetails } = useBook()
    const { fetchBooks, nextBookId, prevBookId } = useBooks()

    const book = computed(() => state.book ?? defaultBook)

    const getCategoryId = () => route.path.split('/')[2]
    const getBookId = () => route.path.split('/')[4]

    // API アクセスでページのデータを取得
    // VueUse とかにこれ系のやつありそう
    const isInitialized = ref(false)
    const unwatch = watch(
      () => route.path,
      async () => {
        await fetchBookDetails(getCategoryId(), getBookId())
        isInitialized.value = true
      },
      { immediate: true }
    )
    onBeforeRouteLeave(() => unwatch())

    onMounted(async () => {
      // 次の本、前の本に遷移する URL を取得
      // books のデータがないと取得できないので取ってくる
      // 本当は↓にしたい
      // * 一覧ページに行ったら毎回取得
      // * このページでは取ってきてなければ取ってきてそうでなければあるやつを使い回す
      await fetchBooks(getCategoryId())
    })

    const prevPath = computed(() => prevBookId(getBookId()))
    const nextPath = computed(() => nextBookId(getBookId()))

    return { book, isInitialized, isError, prevPath, nextPath }
  },
})
</script>

<style lang="scss" scoped>
.bookDetails {
  padding: 10px;
}
</style>

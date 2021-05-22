import { reactive, ref } from 'vue'
import * as books from '../api/books'

type BookDetails = {
  id: string
  name: string
  description: string
  author: string
  publicationDate: string // 手抜き
  page: number
  categoryId: string
}

type BookState = {
  book: BookDetails | null
}

const useBook = () => {
  const isError = ref(false)
  const state = reactive<BookState>({
    book: null,
  })

  const fetchBookDetails = async (categoryId: string, bookId: string) => {
    try {
      const { data } = await books.fetch(categoryId, bookId)
      state.book = data
      isError.value = false
    } catch (e) {
      console.log('fetchBookDetails', e)
      state.book = null
      isError.value = true
    }
  }

  return { state, isError, fetchBookDetails }
}

export default useBook

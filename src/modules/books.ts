import { reactive, ref } from 'vue'
import * as books from '../api/books'

type Book = {
  id: string
  name: string
  description: string
}

type BooksState = {
  books: Book[]
}

const useBooks = () => {
  const isError = ref(false)
  const state = reactive<BooksState>({
    books: [],
  })

  const fetchBooks = async (categoryId: string) => {
    try {
      const { data } = await books.fetchList(categoryId)
      state.books = data
      isError.value = false
    } catch (e) {
      console.log('fetchBooks', e)
      state.books = []
      isError.value = true
    }
  }

  const nextBookId = (currentBookId: string) => {
    const currentIndex = state.books.findIndex((e) => e.id === currentBookId)
    if (currentIndex + 1 >= state.books.length) {
      return undefined
    }
    return state.books[currentIndex + 1].id
  }

  const prevBookId = (currentBookId: string) => {
    const currentIndex = state.books.findIndex((e) => e.id === currentBookId)
    if (currentIndex - 1 < 0) {
      return undefined
    }
    return state.books[currentIndex - 1].id
  }

  return { state, isError, fetchBooks, nextBookId, prevBookId }
}

export default useBooks

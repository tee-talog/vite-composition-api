import { ref, reactive } from 'vue'
import * as categories from '../api/categories'

type Category = {
  id: string
  name: string
}

type CategoriesState = {
  categories: Category[]
}

const useCategories = () => {
  const isError = ref(false)
  const state = reactive<CategoriesState>({
    categories: [],
  })

  const fetchCategories = async () => {
    try {
      const { data } = await categories.fetch()
      state.categories = data
      isError.value = false
    } catch (e) {
      console.log('fetchCategories', e)
      state.categories = []
      isError.value = true
    }
  }

  return { state, isError, fetchCategories }
}

export default useCategories

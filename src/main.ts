import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import App from './App.vue'
import TopPage from './components/TopPage.vue'
import BookList from './components/BookList.vue'
import CategoryNav from './components/CategoryNav.vue'
import BookDetails from './components/BookDetails.vue'

import booksMock from './api/books.mock'
import categoriesMock from './api/categories.mock'

const mock = new MockAdapter(axios)
booksMock(mock)
categoriesMock(mock)

const routes = [
  {
    path: '/',
    components: {
      default: TopPage,
      nav: CategoryNav,
    },
  },
  {
    path: '/categories/:categoryId/books',
    components: {
      default: BookList,
      nav: CategoryNav,
    },
  },
  {
    path: '/categories/:categoryId/books/:bookId',
    components: {
      default: BookDetails,
      nav: CategoryNav,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')

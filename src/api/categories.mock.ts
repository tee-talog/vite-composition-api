import MockAdapter from 'axios-mock-adapter'

const categories = [
  { id: 1, name: 'カテゴリ1' },
  { id: 2, name: 'カテゴリ2' },
]

const categoriesMock = (mock: MockAdapter) => {
  mock.onGet('/api/v1/categories').reply(200, categories)
}

export default categoriesMock

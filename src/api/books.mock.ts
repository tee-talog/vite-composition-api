import MockAdapter from 'axios-mock-adapter'

const books: Record<string, any[]> = {
  '1': [
    { id: '1', name: 'タイトル1', description: '本の説明' },
    { id: '2', name: 'タイトル2', description: '本の説明' },
    { id: '3', name: 'タイトル3', description: '本の説明' },
    { id: '4', name: 'タイトル4', description: '本の説明' },
  ],

  '2': [
    { id: '11', name: 'タイトル11', description: '本の説明' },
    { id: '12', name: 'タイトル12', description: '本の説明' },
    { id: '13', name: 'タイトル13', description: '本の説明' },
  ],
}

const detail = {
  author: '著者やで',
  publicationDate: '2021/01/01',
  page: 100,
}

const booksMock = (mock: MockAdapter) => {
  mock.onGet(new RegExp('/api/v1/categories/[^/]+/books$')).reply((config) => {
    const id = config.url?.split('/')[4] ?? ''

    if (books[id]) {
      return [200, books[id]]
    }
    return [404, {}]
  })

  mock
    .onGet(new RegExp('/api/v1/categories/[^/]+/books/[^/]+'))
    .reply((config) => {
      const categoryId = config.url?.split('/')[4] ?? ''
      const bookId = config.url?.split('/')[6] ?? ''

      const book = books[categoryId].find((e) => e.id === bookId)
      if (book) {
        return [200, { ...book, ...detail, categoryId }]
      }
      return [404, {}]
    })
}

export default booksMock

import axios from 'axios'

// カテゴリに紐付いた本を取得する
export const fetchList = (categoryId: string) =>
  axios.get(`/api/v1/categories/${categoryId}/books`)

// 本の詳細を取得する
export const fetch = (categoryId: string, bookId: string) =>
  axios.get(`/api/v1/categories/${categoryId}/books/${bookId}`)

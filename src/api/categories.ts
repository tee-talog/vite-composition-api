import axios from 'axios'

// 閲覧できるカテゴリを取得する
export const fetch = () => axios.get('/api/v1/categories')

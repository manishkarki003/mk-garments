import api from './api'

export const getCategories = () => api.get('/categories/').then(res => res.data)
export const getProducts = (params = {}) => api.get('/products/', { params }).then(res => res.data)
export const getProductBySlug = (slug) => api.get(`/products/${slug}/`).then(res => res.data)
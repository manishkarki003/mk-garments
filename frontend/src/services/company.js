import api from './api'

export const getCompanyProfile = () => api.get('/company/').then(res => res.data)
export const submitContactMessage = (data) => api.post('/contact/', data).then(res => res.data)
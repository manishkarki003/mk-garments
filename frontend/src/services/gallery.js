import api from './api'

export const getGalleryImages = (params = {}) => api.get('/gallery/', { params }).then(res => res.data)
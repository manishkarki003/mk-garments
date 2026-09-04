import api from './api'

export const getCapabilities = () => api.get('/manufacturing/').then(res => res.data)
export const getProcess = () => api.get('/process/').then(res => res.data)
export const getCertifications = () => api.get('/certifications/').then(res => res.data)
export const getTestimonials = () => api.get('/testimonials/').then(res => res.data)
import api from './api'

export const getCaseStudies = () => api.get('/case-studies/').then(res => res.data)
export const getCaseStudyBySlug = (slug) => api.get(`/case-studies/${slug}/`).then(res => res.data)
export const getBlogPosts = (params = {}) => api.get('/blog/', { params }).then(res => res.data)
export const getBlogPostBySlug = (slug) => api.get(`/blog/${slug}/`).then(res => res.data)
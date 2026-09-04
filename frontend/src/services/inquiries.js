import api from './api'

export const submitInquiry = (formData) =>
  api.post('/inquiries/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data)
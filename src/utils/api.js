import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export const api = axios.create({ baseURL: API_BASE })

// Attach token from localStorage automatically
api.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
  } catch (e) {
    // ignore
  }
  return config
})

export default api

import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userInfo'))
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('userInfo', JSON.stringify(user))
    else localStorage.removeItem('userInfo')
  }, [user])

  const login = async (email, password) => {
    const res = await api.post('/users/login', { email, password })
    setUser(res.data)
    return res.data
  }

  const signup = async (name, email, password) => {
    const res = await api.post('/users/register', { name, email, password })
    setUser(res.data)
    return res.data
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

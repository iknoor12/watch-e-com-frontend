import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(email, password)
      toast.success('Logged in')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-semibold">Login</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 w-full mb-2" placeholder="Email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} className="border p-2 w-full mb-2" placeholder="Password" type="password" />
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading? 'Loading...':'Login'}</button>
      </form>
    </div>
  )
}

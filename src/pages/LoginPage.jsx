import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Login from '../components/Login'

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <Login />
      </main>
      <Footer />
    </div>
  )
}

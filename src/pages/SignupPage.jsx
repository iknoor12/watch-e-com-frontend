import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Signup from '../components/Signup'

export default function SignupPage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <Signup />
      </main>
      <Footer />
    </div>
  )
}

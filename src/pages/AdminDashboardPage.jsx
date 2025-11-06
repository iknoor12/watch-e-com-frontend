import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminDashboard from '../components/AdminDashboard'

export default function AdminDashboardPage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  )
}

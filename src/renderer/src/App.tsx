import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './Dashboard'
import Reservation from './pages/Reservation'

const AppRoutes: React.FC = () => {
  // Check if user is authenticated based on local storage
  const isAuthenticated = !!localStorage.getItem('authenticatedUser')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/reservation" element={<Reservation />} /> {/* Add this route */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  )
}

export default AppRoutes

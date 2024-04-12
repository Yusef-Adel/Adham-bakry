import './assets/main.css'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthProvider'
import AppRoutes from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <div className="">
        <Toaster />
        <AppRoutes />
      </div>
    </AuthProvider>
  </React.StrictMode>
)

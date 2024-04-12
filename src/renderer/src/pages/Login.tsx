/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthProvider'

const Login: React.FC = () => {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if there is an authenticated user in local storage
    const authenticatedUser = localStorage.getItem('authenticatedUser')
    if (authenticatedUser) {
      window.location.href = '/dashboard'
    }
  }, []) // Empty dependency array to run only once on component mount

  // Function to handle form submission
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if username and password are provided
    if (!username || !password) {
      setError('Please provide both username and password.')
      return
    }

    try {
      // Call login function from authentication context
      const isAuthenticated = await login(username, password)

      // If authentication fails, display error message
      if (!isAuthenticated) {
        setError('Invalid username or password.')
      } else {
        // Redirect to home page after successful login
        window.location.href = '/dashboard'
      }
    } catch (error) {
      // Handle any other errors that occur during authentication
      console.error('Login error:', error)
      setError('An error occurred during login.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen font-inter">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-2xl text-right font-bold mb-4">تسجيل الدخول</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-right text-sm font-medium text-gray-700" htmlFor="username">
            الاسم
          </label>
          <input
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-right font-medium text-gray-700" htmlFor="password">
            الرقم السري
          </label>
          <input
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-slate-500"
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  )
}

export default Login

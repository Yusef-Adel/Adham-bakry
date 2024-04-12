import React, { createContext, useState, useContext, ReactNode } from 'react'

// Define the shape of the user object
interface User {
  username: string
}

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to use the authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Authentication provider component
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(() => {
    // Initialize user from local storage on component mount
    const userFromLocalStorage = localStorage.getItem('authenticatedUser')
    return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null
  })

  // Function to authenticate the user
  const login = (username: string, password: string): boolean => {
    // Check if credentials are valid
    const isValidCredentials = users[username] === password
    if (isValidCredentials) {
      // Save user to local storage
      localStorage.setItem('authenticatedUser', JSON.stringify({ username }))
      setAuthenticatedUser({ username })
    }
    return isValidCredentials
  }

  // Function to logout the user
  const logout = (): void => {
    // Remove user from local storage
    localStorage.removeItem('authenticatedUser')
    setAuthenticatedUser(null)
  }

  const authContextValue: AuthContextType = {
    user: authenticatedUser,
    login,
    logout
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

// Dummy user data
const users: { [key: string]: string } = {
  user1: 'password1',
  user2: 'password2'
  // Add more users if needed
}

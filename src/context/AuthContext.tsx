import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  setAuthenticated: (nuevo: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined) 

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ isAuthenticated, setAuthenticated ] = useState(false) 

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be inside AuthProvider')
  }
  return context
}
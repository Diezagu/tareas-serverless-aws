import { type ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export function RouteGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  return (!isAuthenticated) ? <Navigate to="/login" /> : children
}
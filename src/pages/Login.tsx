import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const { setAuthenticated } = useAuth()
  const navigate = useNavigate()

  function handleClick() {
    setAuthenticated(true)
    navigate('/tareas')
  }

  return (
    <div>
      <h1>Iniciar Sesion</h1>
      <button onClick={handleClick}>Iniciar Sesion</button>
    </div>
  )
}
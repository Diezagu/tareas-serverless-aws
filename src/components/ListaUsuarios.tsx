import { useFetch } from '../hooks/useFetch'

interface Usuario {
  id: number
  name: string
  email: string
}

export function ListaUsuarios() {
  const { response, cargando, error } = useFetch<Usuario>(() => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()))
  
  if (error) return <span>{error}</span>
  if (cargando) return <span>Cargando...</span>

  return (
    <ul>
      { response.map((user) => (
        <li key={user.id}>Nombre {user.name} <br/>Email: {user.email}</li>
      ))}
    </ul>
  )
}
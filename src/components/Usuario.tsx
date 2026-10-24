import { useState } from 'react'

interface UsuarioData {
  id: number
  nombre: string
  email: string
}

interface UsuarioProps{
  usuario: UsuarioData
}

export function Usuario({ usuario }: UsuarioProps){
  const [esFavorito, setEsFavorito] = useState(false)

  return (
    <div>
      <p>Nombre: {usuario.nombre}</p>
      <p>Email: {usuario.email}</p> 
      <span>{esFavorito ? '⭐ Favorito' : '☆ No favorito'}</span>
      <button onClick={() => setEsFavorito(prev => !prev)}>Favorito</button>
    </div>
  )
}
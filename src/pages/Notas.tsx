import { useForm } from '../hooks/useForm'
import { useState } from 'react'

interface Nota {
  id: number
  titulo: string
  contenido: string
  esFavorita: boolean
}

interface NotaFormValue {
  titulo: string
  contenido: string
}

export function Notas() {
  const { valores, handleChange, reset } = useForm<NotaFormValue>({ titulo: "", contenido: "" })
  const [notas, setNotas] = useState<Nota[]>([])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nuevaNota = {
      id: Date.now(),
      titulo: valores.titulo,
      contenido: valores.contenido,
      esFavorita: false
    }

    setNotas(prev => [...prev, nuevaNota])
  }

  function handleLimpiar() {
    reset()
  }

  function toggleFavorite(id: number) {
    setNotas((current) =>
      current.map((nota) =>
        nota.id === id ? { ...nota, esFavorita: !nota.esFavorita } : nota
      )
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="titulo" value={valores.titulo} onChange={handleChange} /><br />
        <input name="contenido" value={valores.contenido} onChange={handleChange} /><br />
        <button type='button' onClick={handleLimpiar}>Limpiar</button>
        <button>Crear Nota</button>
      </form>

      <span>Notas Favoritas</span>
      <ul>
        {notas.length > 0 ? (notas
          .filter(nota => nota.esFavorita)
          .map((nota) => (
            <li key={nota.id}>{nota.titulo} ========== {nota.contenido}
              <button onClick={() => toggleFavorite(nota.id)}>Desmarcar</button>
            </li>
          ))
        ) : <span>No hay notas para mostrar</span>
        }
      </ul>

      <span>Notas</span>
      <ul>
        {notas.length > 0 ? (notas
          .filter(nota => !nota.esFavorita)
          .map((nota) => (
            <li key={nota.id}>{nota.titulo} ========== {nota.contenido}
              <button onClick={() => toggleFavorite(nota.id)}>Marcar Favorita</button>
            </li>
          ))
        ) : <span>No hay notas para mostrar</span>
        }
      </ul>
    </div>
  )
}

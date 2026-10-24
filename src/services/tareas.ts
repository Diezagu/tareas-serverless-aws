const url = import.meta.env.VITE_API_URL

export async function obtenerTareas() {
  const response = await fetch(`${url}/tareas`, {
    headers: { "Content-Type": 'application/json' }
  })

  if (!response.ok) {
    throw new Error("Error al obtener tareas")
  }

  return response.json()
}

export async function crearTarea(texto: string) {
  const response = await fetch(`${url}/tareas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto })
  })

  if (!response.ok) {
    throw new Error("Error al crear la tarea")
  }

  return response.json()
}

export async function actualizarTarea(id: string, data: { texto: string, completada: boolean }) {
  const response = await fetch(`${url}/tareas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    throw new Error("Error al actualizar la tarea")
  }

  return response.json()
}

export async function eliminarTarea(id: string) {
  const response = await fetch(`${url}/tareas/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea")
  }

  return response.json()
}
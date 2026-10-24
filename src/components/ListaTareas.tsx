import { useState } from 'react'
import { useFetch } from '../hooks/useFetch.ts'
import { obtenerTareas } from '../services/tareas.ts'
import { crearTarea, actualizarTarea, eliminarTarea } from '../services/tareas.ts'
import styles from './ListaTareas.module.css'

interface Tarea {
  id: string
  texto: string
  completada: boolean
}

export function ListaTareas() {
  const { response, get, cargando, error } = useFetch<Tarea>(obtenerTareas)
  const [texto, setTexto] = useState('')
  const [errorAction, setErrorAction] = useState('')
  const [guardando, setGuardando] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (texto.trim() === '') return
    setGuardando(true)
    try {
      setErrorAction('')
      await crearTarea(texto.trim())
      setTexto('')
      get()
    } catch (err) {
      console.error("handleSubmit fallo: ", err)
      setErrorAction('No se pudo crear la tarea, por favor, reintentalo')
    } finally {
      setGuardando(false)
    }
  }

  async function toggleCompletada(id: string, texto: string, completada: boolean) {
    const data = { texto, completada: !completada }
    try {
      setErrorAction('')
      await actualizarTarea(id, data)
      get()
    } catch (err) {
      console.error("toggleCompletada fallo: ", err)
      setErrorAction('No se pudo cambiar el estado de la tarea, por favor, reintentalo')
    }
  }

  async function eliminarTask(id: string) {
    try {
      setErrorAction('')
      const confirmado = window.confirm("¿Seguro que deseas eliminar la tarea?")
      if (!confirmado) return
      await eliminarTarea(id)
      get()
    } catch (err) {
      console.error("eliminarTask fallo: ", err)
      setErrorAction('No se pudo eliminar la tarea, por favor, reintentalo')
    }
  }

  return (
    <section className={styles.contenedor}>
      <h2>Lista de Tareas</h2>
      {cargando && response.length === 0 ? <p>Cargando...</p>
        : error && response.length === 0 ? <p className={styles.alert} role="alert">{error} <button onClick={() => get()}>Reintentar</button></p>
          : response.length === 0 ? <p className={styles.status} role="status">No hay tareas para mostrar</p> :
            <ul className={styles.lista}>
              {response.map((item) => (
                <li key={item.id} className={styles.item}>
                  <label className={item.completada ? styles.completada: ''}>
                    <input checked={item.completada} type="checkbox" onChange={() => toggleCompletada(item.id, item.texto, item.completada)}/>
                    {item.texto}
                  </label>
                  <button aria-label={`Eliminar tarea ${item.texto}`} onClick={() => eliminarTask(item.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
      }
      {errorAction ? <p className={styles.alert} role="alert">{ errorAction }</p> : ''}
      {cargando && response.length > 0 ? <p className={styles.status} role="status">Actualizando...</p> : ''}
      {error && response.length > 0 ? <p className={styles.alert} role="alert">{error}. Los datos podrian ser viejos <button onClick={() => get()}>Reintentar</button></p> : ''}

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <label htmlFor="tarea">Texto de la tarea:</label>
        <input id="tarea" value={texto} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTexto(e.target.value)} placeholder="Ingresa el texto de la tarea" />
        <button className={ styles.boton } type="submit" disabled={guardando || texto.trim() === ''}>{guardando ? 'Creando...' : 'Crear'}</button>
      </form>
    </section>
  )
}

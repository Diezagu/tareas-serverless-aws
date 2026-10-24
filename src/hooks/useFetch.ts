import { useState, useEffect } from 'react'

export function useFetch<T>(fetchFn: () => Promise<T[]>) {
  const [ response, setResponse ] = useState<T[]>([])
  const [ cargando, setCargando ] = useState(true)
  const [ error, setError ] =  useState('')

  useEffect(() => {
    get()
  }, [])

  async function get() {
    try {
      setError('')
      setCargando(true)
      const res = await fetchFn()
      setResponse(res)
    } catch (errorString) {
      console.error(errorString)
      setError("Error al cargar la información")
    } finally {
      setCargando(false)
    }
  } 

  return { response, cargando, error, get }
}
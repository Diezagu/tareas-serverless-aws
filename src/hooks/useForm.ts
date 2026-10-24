import { useState } from 'react'

export function useForm<T>(valoresIniciales: T) {
  const [ valores, setValores ] = useState<T>(valoresIniciales) 

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target 
    const llave = name as keyof T
    setValores(prev => ({ ...prev, [llave]: value }))
  }

  function reset() {
    setValores(valoresIniciales)
  }

  return { valores, handleChange, reset }
}
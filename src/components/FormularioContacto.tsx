import { useForm } from '../hooks/useForm'
 
interface FormData {
  nombre: string
  mensaje: string
}

export function FormularioContacto() {
  const { valores, handleChange, reset } = useForm<FormData>({ nombre:"", mensaje: "" })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log(valores)
  }

  function handleLimpiar(){
    reset()
  }

  return(
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={valores.nombre} onChange={handleChange}></input><br/>
      <input name="mensaje" value={valores.mensaje} onChange={handleChange}></input><br/>
      <button type="button" onClick={handleLimpiar}>Limpiar</button>
      <button>Enviar</button>
    </form>
  )
}
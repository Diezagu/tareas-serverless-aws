interface PerfilProps {
  nombre: string
  rol: string
  anosExp: number
}

export function Perfil({ nombre, rol, anosExp }: PerfilProps) {
  return <h1>Nombre: {nombre}, Rol: {rol}, Experiencia: {anosExp}</h1>
}

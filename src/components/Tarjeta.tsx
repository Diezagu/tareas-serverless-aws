interface TarjetaProps{
  children: React.ReactNode
}

export function Tarjeta({ children }: TarjetaProps) {
  return(
    <div>
      {children}
    </div>
  )
}

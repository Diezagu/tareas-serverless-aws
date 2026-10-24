interface ListaProps {
  items: string[]
}

export function Lista({ items }: ListaProps) {
  return(
    <div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

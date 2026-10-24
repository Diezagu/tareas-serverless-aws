import { useCarrito } from '../context/CarritoContext'

export function Carrito() {
  const { items, addItemToCart } = useCarrito()

  return (
    <div>
      <button onClick={ () => addItemToCart({ nombre: "Leche", precio: 50 }) }>Agregar</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{ item.nombre } ------ { item.precio }</li>
        ))}
      </ul>
    </div>
  )
}
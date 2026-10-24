import { useState, createContext, useContext, type ReactNode } from 'react'

interface CarritoContextType {
  items: ItemType[],
  addItemToCart: (item: ItemType) => void
}

interface ItemType {
  nombre: string
  precio: number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [ items, setItems ] = useState<ItemType[]>([])

  function addItemToCart(item: ItemType) {
    setItems(prev => [...prev, item])
  }

  return (
    <CarritoContext.Provider value={{ items, addItemToCart }}>
      { children }
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const context = useContext(CarritoContext)
  if( !context ) {
    throw new Error("useCarrito must be inside CarritoProvider")
  }
  return context
}
import { Routes, Route, Outlet } from 'react-router-dom'
import { Inicio } from './pages/Inicio'
import { Login } from './pages/Login'
import { ListaUsuarios } from './components/ListaUsuarios'
import { ListaTareas } from './components/ListaTareas.tsx'
import { RouteGuard } from './components/RouteGuard'
import { Carrito } from './components/Carrito.tsx'
import { CarritoProvider } from './context/CarritoContext.tsx'


export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/carrito" element={<CarritoProvider><Carrito/></CarritoProvider>}/>

      <Route element={<RouteGuard><Outlet/></RouteGuard>}>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/usuarios" element={<ListaUsuarios/>}/>
        <Route path="/tareas" element={<ListaTareas/>}/>
      </Route>
    </Routes>
  )
}
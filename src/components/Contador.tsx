import { useState, useEffect } from "react"

export function Contador() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `Contador ${count}`
  },[count])

  return(
    <div>
      <span>Contador: {count}</span>
      <button onClick={() => setCount(current => current + 1)}>+1</button>
      <button onClick={() => setCount(current => current > 0 ? current - 1 : current)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
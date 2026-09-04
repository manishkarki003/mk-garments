import { useEffect, useState } from 'react'
import { getProducts } from './services/products'

function App() {
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    getProducts()
      .then((data) => setStatus(`Connected! Product count: ${data.count}`))
      .catch((err) => setStatus(`Error: ${err.message}`))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <h1 className="text-2xl font-sans text-charcoal">{status}</h1>
    </div>
  )
}

export default App
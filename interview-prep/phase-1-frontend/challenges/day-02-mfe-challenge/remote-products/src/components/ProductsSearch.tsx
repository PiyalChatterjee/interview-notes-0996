import { useMemo, useState } from 'react'

type Product = {
  id: string
  name: string
  category: string
  price: number
}

const seedProducts: Product[] = [
  { id: 'P-100', name: 'Cloud Notebook', category: 'Productivity', price: 49 },
  { id: 'P-101', name: 'Azure Hoodie', category: 'Merch', price: 79 },
  { id: 'P-102', name: 'Dev Keyboard', category: 'Hardware', price: 129 },
  { id: 'P-103', name: 'TypeScript Mug', category: 'Merch', price: 19 },
  { id: 'P-104', name: 'Monitor Arm', category: 'Hardware', price: 99 },
  { id: 'P-105', name: 'System Design Cards', category: 'Learning', price: 29 },
]

export default function ProductsSearch() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return seedProducts
    return seedProducts.filter((item) => item.name.toLowerCase().includes(normalized))
  }, [query])

  return (
    <div className="products-widget">
      <div className="products-toolbar">
        <label htmlFor="search">Search product</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try: cloud, mug, keyboard"
        />
      </div>

      <ul className="products-list">
        {filtered.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>{product.category}</span>
            <em>${product.price}</em>
          </li>
        ))}
      </ul>
    </div>
  )
}

import { useState, useTransition, useDeferredValue, memo, useMemo } from 'react';
import { generateMockProducts } from '../types';
import type { Product, FilterState } from '../types';

// ── ResultsList ───────────────────────────────────────────────────────────────
// CRITICAL: memo prevents re-render when deferredFilter hasn't settled yet
// Without memo, useDeferredValue provides no benefit
const ResultsList = memo(function ResultsList({
  products,
  filter,
}: {
  products: Product[];
  filter: FilterState;
}) {
  // Expensive filtering computation — intentionally unoptimized to show Concurrent Rendering
  const filtered = products.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(filter.query.toLowerCase());
    const matchesCategory = filter.category === 'all' || p.category === filter.category;
    return matchesQuery && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filter.sortBy === 'price') return a.price - b.price;
    if (filter.sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="results-grid">
      <p className="results-count">{sorted.length} products found</p>
      {sorted.slice(0, 50).map((product) => (
        <div key={product.id} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
          <span className="product-name">{product.name}</span>
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-category">{product.category}</span>
        </div>
      ))}
    </div>
  );
});

// ── SearchPage ────────────────────────────────────────────────────────────────
export default function SearchPage() {
  // Generate once — 500 mock products to make filtering visibly expensive
  const allProducts = useMemo(() => generateMockProducts(500), []);

  const [filter, setFilter] = useState<FilterState>({
    query: '',
    category: 'all',
    sortBy: 'name',
  });

  // TODO CHALLENGE STEP 1:
  // Replace the direct setFilter calls below with useTransition
  // so filtering is non-urgent and the input stays responsive
  const [isPending, startTransition] = useTransition();

  // TODO CHALLENGE STEP 2:
  // Use useDeferredValue on the filter passed to ResultsList
  // to demonstrate the read-side deferral pattern
  const deferredFilter = useDeferredValue(filter);

  const updateFilter = (partial: Partial<FilterState>) => {
    // STEP 1: Wrap in startTransition
    startTransition(() => {
      setFilter((prev) => ({ ...prev, ...partial }));
    });
  };

  return (
    <section className="search-page">
      <h2>Product Search — Concurrent Rendering Demo</h2>
      <p className="hint">
        Filter updates use <code>useTransition</code> — the input never blocks even during heavy re-renders.
      </p>

      <div className="filter-bar">
        <input
          type="search"
          placeholder="Search products..."
          // NOTE: query state updates are NOT deferred — the input is always responsive
          onChange={(e) => updateFilter({ query: e.target.value })}
          className="search-input"
          aria-label="Search products"
        />

        <select
          onChange={(e) => updateFilter({ category: e.target.value })}
          className="category-select"
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
        </select>

        <select
          onChange={(e) => updateFilter({ sortBy: e.target.value as FilterState['sortBy'] })}
          className="sort-select"
          aria-label="Sort by"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>

        {isPending && (
          <span className="pending-indicator" role="status" aria-live="polite">
            Filtering...
          </span>
        )}
      </div>

      {/* Pass deferredFilter so React can keep showing stale results
          while computing the new filtered list in the background */}
      <ResultsList products={allProducts} filter={deferredFilter} />
    </section>
  );
}

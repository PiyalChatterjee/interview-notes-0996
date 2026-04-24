// Types for Day 1 Challenge
// Keep types co-located with their domain

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

export interface FilterState {
  query: string;
  category: string;
  sortBy: 'price' | 'name' | 'date';
}

export interface FormState {
  success: boolean;
  error: string | null;
  submittedAt?: string;
}

// Generate mock product data for the search challenge
export function generateMockProducts(count: number): Product[] {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
  return Array.from({ length: count }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: `Product ${i + 1} — ${categories[i % categories.length]}`,
    category: categories[i % categories.length],
    price: Math.round(Math.random() * 500 * 100) / 100,
    inStock: Math.random() > 0.3,
  }));
}

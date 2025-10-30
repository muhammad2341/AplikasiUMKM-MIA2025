import { useState } from "react";
import { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Contoh fungsi pencarian produk
  const searchProducts = (
    query: string,
    filters: Record<string, unknown>
  ): Product[] => {
    let results = products;

    // filter nama
    if (query) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // filter kategori (contoh)
    if (filters.category) {
      results = results.filter((p) => p.category === filters.category);
    }

    return results;
  };

  return { products, loading, searchProducts };
}

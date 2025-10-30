import {
  Database,
  createDatabase,
  validateUser,
  validateUMKM,
  validateProduct,
} from "./schema";
import type { User } from "@/types/user";
import type { UMKM } from "@/types/umkm";
import type { Product } from "@/types/product";

// Simple in-memory database for demo
// In production, replace with real database (PostgreSQL, MongoDB, etc.)

let db: Database;

export function getDatabase(): Database {
  if (!db) {
    db = createDatabase();
    // Load from localStorage if available (for persistence)
    loadFromLocalStorage();
  }
  return db;
}

export function saveDatabase() {
  if (typeof window !== "undefined") {
    localStorage.setItem("umkm-database", JSON.stringify(db));
  }
}

export function loadFromLocalStorage() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("umkm-database");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        parsed.users = parsed.users.map((user: unknown) => ({
          ...(user as Record<string, unknown>),
          createdAt: new Date(
            (user as Record<string, unknown>).createdAt as string
          ),
          updatedAt: new Date(
            (user as Record<string, unknown>).updatedAt as string
          ),
        }));
        parsed.umkm = parsed.umkm.map((umkm: unknown) => ({
          ...(umkm as Record<string, unknown>),
          createdAt: new Date(
            (umkm as Record<string, unknown>).createdAt as string
          ),
          updatedAt: new Date(
            (umkm as Record<string, unknown>).updatedAt as string
          ),
          businessHours: (
            (umkm as Record<string, unknown>).businessHours as unknown[]
          ).map((bh: unknown) => ({
            ...(bh as Record<string, unknown>),
          })),
        }));
        parsed.products = parsed.products.map((product: unknown) => ({
          ...(product as Record<string, unknown>),
          createdAt: new Date(
            (product as Record<string, unknown>).createdAt as string
          ),
          updatedAt: new Date(
            (product as Record<string, unknown>).updatedAt as string
          ),
          discount: (product as Record<string, unknown>).discount
            ? {
                ...((product as Record<string, unknown>).discount as Record<
                  string,
                  unknown
                >),
                startDate: new Date(
                  (
                    (product as Record<string, unknown>).discount as Record<
                      string,
                      unknown
                    >
                  ).startDate as string
                ),
                endDate: new Date(
                  (
                    (product as Record<string, unknown>).discount as Record<
                      string,
                      unknown
                    >
                  ).endDate as string
                ),
              }
            : undefined,
        }));
        parsed.analytics.umkmViews = parsed.analytics.umkmViews.map(
          (view: unknown) => ({
            ...(view as Record<string, unknown>),
            timestamp: new Date(
              (view as Record<string, unknown>).timestamp as string
            ),
          })
        );
        parsed.analytics.productViews = parsed.analytics.productViews.map(
          (view: unknown) => ({
            ...(view as Record<string, unknown>),
            timestamp: new Date(
              (view as Record<string, unknown>).timestamp as string
            ),
          })
        );
        parsed.analytics.contactClicks = parsed.analytics.contactClicks.map(
          (click: unknown) => ({
            ...(click as Record<string, unknown>),
            timestamp: new Date(
              (click as Record<string, unknown>).timestamp as string
            ),
          })
        );

        db = parsed;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(
            "Failed to load database from localStorage:",
            error.message
          );
        } else {
          console.error("Failed to load database from localStorage:", error);
        }
        db = createDatabase();
      }
    }
  }
}

export function resetDatabase() {
  db = createDatabase();
  saveDatabase();
}

// User operations
export function createUser(
  userData: Omit<User, "id" | "createdAt" | "updatedAt"> & { password: string }
): User {
  const errors = validateUser(userData);
  if (!userData.password) {
    errors.push("Password is required");
  }
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }

  const db = getDatabase();
  const existingUser = db.users.find((u) => u.email === userData.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const newUser: User = {
    id: generateId(),
    ...userData,
    password: userData.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.users.push(newUser);
  saveDatabase();
  return newUser;
}

export function getUserById(id: string): User | undefined {
  const db = getDatabase();
  return db.users.find((user) => user.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  const db = getDatabase();
  return db.users.find((user) => user.email === email);
}

export function updateUser(id: string, updates: Partial<User>): User {
  const db = getDatabase();
  const userIndex = db.users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  db.users[userIndex] = {
    ...db.users[userIndex],
    ...updates,
    updatedAt: new Date(),
  };

  saveDatabase();
  return db.users[userIndex];
}

// Simple password verification (no hashing)
export async function verifyPassword(
  input: string,
  actual: string | undefined
): Promise<boolean> {
  if (!actual) return false;
  return input === actual;
}

// Dummy hashPassword function (for demo, just return original password)
export async function hashPassword(password: string): Promise<string> {
  return password;
}

// UMKM operations
export function createUMKM(
  umkmData: Omit<UMKM, "id" | "createdAt" | "updatedAt" | "products">
): UMKM {
  const errors = validateUMKM(umkmData);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }

  const db = getDatabase();
  const owner = db.users.find((u) => u.id === umkmData.ownerId);
  if (!owner || owner.role !== "seller") {
    throw new Error("Only sellers can create UMKM");
  }

  const newUMKM: UMKM = {
    id: generateId(),
    ...umkmData,
    products: [],
    rating: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.umkm.push(newUMKM);
  saveDatabase();
  return newUMKM;
}

export function getUMKMById(id: string): UMKM | undefined {
  const db = getDatabase();
  return db.umkm.find((umkm) => umkm.id === id);
}

export function getUMKMBySlug(slug: string): UMKM | undefined {
  const db = getDatabase();
  return db.umkm.find((umkm) => umkm.slug === slug);
}

export function getUMKMByOwner(ownerId: string): UMKM[] {
  const db = getDatabase();
  return db.umkm.filter((umkm) => umkm.ownerId === ownerId);
}

export function updateUMKM(id: string, updates: Partial<UMKM>): UMKM {
  const db = getDatabase();
  const umkmIndex = db.umkm.findIndex((umkm) => umkm.id === id);

  if (umkmIndex === -1) {
    throw new Error("UMKM not found");
  }

  db.umkm[umkmIndex] = {
    ...db.umkm[umkmIndex],
    ...updates,
    updatedAt: new Date(),
  };

  saveDatabase();
  return db.umkm[umkmIndex];
}

// Product operations
export function createProduct(
  productData: Omit<Product, "id" | "createdAt" | "updatedAt">
): Product {
  const errors = validateProduct(productData);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }

  const db = getDatabase();
  const umkm = db.umkm.find((u) => u.id === productData.umkmId);
  if (!umkm) {
    throw new Error("UMKM not found");
  }

  const newProduct: Product = {
    id: generateId(),
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.products.push(newProduct);

  // Add product to UMKM's product list
  umkm.products.push(newProduct);

  saveDatabase();
  return newProduct;
}

export function getProductById(id: string): Product | undefined {
  const db = getDatabase();
  return db.products.find((product) => product.id === id);
}

export function getProductsByUMKM(umkmId: string): Product[] {
  const db = getDatabase();
  return db.products.filter((product) => product.umkmId === umkmId);
}

export function updateProduct(id: string, updates: Partial<Product>): Product {
  const db = getDatabase();
  const productIndex = db.products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    throw new Error("Product not found");
  }

  db.products[productIndex] = {
    ...db.products[productIndex],
    ...updates,
    updatedAt: new Date(),
  };

  saveDatabase();
  return db.products[productIndex];
}

export function deleteProduct(id: string): void {
  const db = getDatabase();
  const productIndex = db.products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    throw new Error("Product not found");
  }

  // Remove product from UMKM's product list
  const product = db.products[productIndex];
  const umkm = db.umkm.find((u) => u.id === product.umkmId);
  if (umkm) {
    umkm.products = umkm.products.filter((p: Product) => p.id !== id);
  }

  db.products.splice(productIndex, 1);
  saveDatabase();
}

// Search operations
export function searchUMKM(
  query: string,
  filters?: Record<string, unknown>
): UMKM[] {
  const db = getDatabase();
  let results = db.umkm;

  // Apply search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (umkm) =>
        umkm.name.toLowerCase().includes(lowerQuery) ||
        umkm.description.toLowerCase().includes(lowerQuery) ||
        umkm.category.toLowerCase().includes(lowerQuery) ||
        umkm.address.toLowerCase().includes(lowerQuery)
    );
  }

  // Apply filters
  if (filters) {
    if (filters.category) {
      results = results.filter((umkm) => umkm.category === filters.category);
    }
    if (filters.rating) {
      results = results.filter(
        (umkm) => umkm.rating >= (filters.rating as number)
      );
    }
    if (filters.location) {
      results = results.filter((umkm) =>
        umkm.address
          .toLowerCase()
          .includes((filters.location as string).toLowerCase())
      );
    }
  }

  return results;
}

export function searchProducts(
  query: string,
  filters?: Record<string, unknown>
): Product[] {
  const db = getDatabase();
  let results = db.products;

  // Apply search query
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Apply filters
  if (filters) {
    if (filters.category) {
      results = results.filter(
        (product) => product.category === filters.category
      );
    }
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case "under-50k":
          results = results.filter((product) => product.price < 50000);
          break;
        case "50k-100k":
          results = results.filter(
            (product) => product.price >= 50000 && product.price <= 100000
          );
          break;
        case "100k-500k":
          results = results.filter(
            (product) => product.price >= 100000 && product.price <= 500000
          );
          break;
        case "over-500k":
          results = results.filter((product) => product.price > 500000);
          break;
      }
    }
    if (filters.availability) {
      results = results.filter((product) => product.isAvailable);
    }
    if (filters.hasDiscount) {
      results = results.filter(
        (product) => product.discount && product.discount.isActive
      );
    }
    if (filters.umkmId) {
      results = results.filter((product) => product.umkmId === filters.umkmId);
    }
  }

  return results;
}

// Analytics operations
export function trackUMKMView(umkmId: string): void {
  const db = getDatabase();
  db.analytics.umkmViews.push({
    umkmId,
    timestamp: new Date(),
  });
  saveDatabase();
}

export function trackProductView(productId: string): void {
  const db = getDatabase();
  db.analytics.productViews.push({
    productId,
    timestamp: new Date(),
  });
  saveDatabase();
}

export function trackContactClick(umkmId: string, method: string): void {
  const db = getDatabase();
  db.analytics.contactClicks.push({
    umkmId,
    method,
    timestamp: new Date(),
  });
  saveDatabase();
}

export function getUMKMAnalytics(umkmId: string) {
  const db = getDatabase();
  const umkmViews = db.analytics.umkmViews.filter(
    (view) => view.umkmId === umkmId
  );
  const productViews = db.analytics.productViews.filter((view) => {
    const product = db.products.find((p) => p.id === view.productId);
    return product && product.umkmId === umkmId;
  });
  const contactClicks = db.analytics.contactClicks.filter(
    (click) => click.umkmId === umkmId
  );

  return {
    totalViews: umkmViews.length,
    totalProductViews: productViews.length,
    totalContactClicks: contactClicks.length,
    viewsByDate: groupByDate(umkmViews),
    contactClicksByMethod: groupByMethod(contactClicks),
  };
}

// Favorites operations
export function toggleFavorite(userId: string, umkmId: string): boolean {
  const db = getDatabase();
  const existingIndex = db.favorites.findIndex(
    (fav) => fav.userId === userId && fav.umkmId === umkmId
  );

  if (existingIndex >= 0) {
    // Remove favorite
    db.favorites.splice(existingIndex, 1);
    saveDatabase();
    return false;
  } else {
    // Add favorite
    db.favorites.push({ userId, umkmId });
    saveDatabase();
    return true;
  }
}

export function getUserFavorites(userId: string): string[] {
  const db = getDatabase();
  return db.favorites
    .filter((fav) => fav.userId === userId)
    .map((fav) => fav.umkmId);
}

export function isUMKMFavorite(userId: string, umkmId: string): boolean {
  const db = getDatabase();
  return db.favorites.some(
    (fav) => fav.userId === userId && fav.umkmId === umkmId
  );
}

// Helper functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function groupByDate(views: { timestamp: Date }[]): Record<string, number> {
  return views.reduce((acc, view) => {
    const date = view.timestamp.toISOString().split("T")[0];
    acc[date] = (acc[date] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function groupByMethod(clicks: { method: string }[]): Record<string, number> {
  return clicks.reduce((acc, click) => {
    acc[click.method] = (acc[click.method] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

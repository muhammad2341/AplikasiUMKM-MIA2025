import { User, UMKM, Product, Discount, BusinessHour } from "@/types";

export type { User, UMKM, Product, Discount, BusinessHour };

export interface Database {
  users: User[];
  umkm: UMKM[];
  products: Product[];
  discounts: Discount[];
  sessions: unknown[];
  favorites: { userId: string; umkmId: string }[];
  analytics: {
    umkmViews: { umkmId: string; timestamp: Date }[];
    productViews: { productId: string; timestamp: Date }[];
    contactClicks: { umkmId: string; method: string; timestamp: Date }[];
  };
}

// Initial sample data
export const initialData: Database = {
  users: [
    {
      id: "user1",
      email: "seller@umkm.com",
      name: "Ahmad Wijaya",
      role: "seller",
      phone: "+628123456789",
      avatar: "/images/avatars/seller1.jpg",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "user2",
      email: "customer@email.com",
      name: "Sari Dewi",
      role: "customer",
      phone: "+628987654321",
      avatar: "/images/avatars/customer1.jpg",
      createdAt: new Date("2024-01-02"),
      updatedAt: new Date("2024-01-02"),
    },
  ],
  umkm: [
    {
      id: "umkm1",
      slug: "kedai-kopi-bahagia",
      name: "Kedai Kopi Bahagia",
      description:
        "Kedai kopi lokal dengan biji kopi pilihan dari petani lokal.",
      category: "food",
      phone: "+628123456789",
      email: "kedai.bahagia@email.com",
      address: "Jl. Merdeka No. 123, Jakarta Pusat",
      lat: -6.2088,
      lng: 106.8456,
      logo: "/images/umkm/coffee-logo.jpg",
      banner: "/images/umkm/coffee-banner.jpg",
      rating: 4.5,
      businessHours: [
        { day: "Senin", open: "07:00", close: "22:00", isClosed: false },
        { day: "Selasa", open: "07:00", close: "22:00", isClosed: false },
        { day: "Rabu", open: "07:00", close: "22:00", isClosed: false },
        { day: "Kamis", open: "07:00", close: "22:00", isClosed: false },
        { day: "Jumat", open: "07:00", close: "23:00", isClosed: false },
        { day: "Sabtu", open: "08:00", close: "23:00", isClosed: false },
        { day: "Minggu", open: "08:00", close: "21:00", isClosed: false },
      ],
      products: [],
      ownerId: "user1",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  ],
  products: [
    {
      id: "product1",
      name: "Kopi Arabika Gayo",
      description:
        "Kopi arabika asal Gayo dengan rasa bold dan aroma yang harum.",
      price: 25000,
      originalPrice: 30000,
      images: ["/images/products/coffee-arabika-1.jpg"],
      category: "beverage",
      umkmId: "umkm1",
      isAvailable: true,
      discount: {
        id: "discount1",
        type: "percentage",
        value: 15,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        isActive: true,
      },
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  ],
  discounts: [
    {
      id: "discount1",
      type: "percentage",
      value: 15,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      isActive: true,
    },
  ],
  sessions: [],
  favorites: [{ userId: "user2", umkmId: "umkm1" }],
  analytics: {
    umkmViews: [
      { umkmId: "umkm1", timestamp: new Date("2024-01-15T10:00:00") },
      { umkmId: "umkm1", timestamp: new Date("2024-01-15T11:30:00") },
    ],
    productViews: [
      { productId: "product1", timestamp: new Date("2024-01-15T10:15:00") },
    ],
    contactClicks: [
      {
        umkmId: "umkm1",
        method: "whatsapp",
        timestamp: new Date("2024-01-15T10:20:00"),
      },
    ],
  },
};

// Helper functions for database operations
export function createDatabase(): Database {
  return JSON.parse(JSON.stringify(initialData));
}

export function validateUser(user: Partial<User>): string[] {
  const errors: string[] = [];

  if (!user.email) errors.push("Email is required");
  if (!user.name) errors.push("Name is required");
  if (!user.role) errors.push("Role is required");

  if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push("Invalid email format");
  }

  return errors;
}

export function validateUMKM(umkm: Partial<UMKM>): string[] {
  const errors: string[] = [];

  if (!umkm.name) errors.push("UMKM name is required");
  if (!umkm.category) errors.push("Category is required");
  if (!umkm.phone) errors.push("Phone is required");
  if (!umkm.address) errors.push("Address is required");
  if (!umkm.ownerId) errors.push("Owner ID is required");

  return errors;
}

export function validateProduct(product: Partial<Product>): string[] {
  const errors: string[] = [];

  if (!product.name) errors.push("Product name is required");
  if (!product.price) errors.push("Price is required");
  if (!product.category) errors.push("Category is required");
  if (!product.umkmId) errors.push("UMKM ID is required");

  if (product.price && product.price < 0) {
    errors.push("Price cannot be negative");
  }

  return errors;
}

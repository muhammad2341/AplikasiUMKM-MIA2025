import { UMKM, Product, User, BusinessHour } from "@/types";

// Mock Users
export const mockUsers: User[] = [
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
  {
    id: "user3",
    email: "fashion.seller@email.com",
    name: "Budi Santoso",
    role: "seller",
    phone: "+628555666777",
    avatar: "/images/avatars/seller2.jpg",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
];

// Mock UMKM Data
export const mockUMKM: UMKM[] = [
  {
    id: "umkm1",
    slug: "kedai-kopi-bahagia",
    name: "Kedai Kopi Bahagia",
    description:
      "Kedai kopi lokal dengan biji kopi pilihan dari petani lokal. Menyediakan berbagai jenis kopi dan camilan dengan suasana yang cozy dan nyaman.",
    category: "food",
    phone: "+628123456789",
    email: "kedai.bahagia@email.com",
    address: "Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta",
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
  {
    id: "umkm2",
    slug: "butik-modern-fashion",
    name: "Butik Modern Fashion",
    description:
      "Butik fashion dengan desain terkini dan bahan berkualitas. Specialized in modern casual wear dengan harga terjangkau.",
    category: "fashion",
    phone: "+628555666777",
    email: "butik.modern@email.com",
    address: "Jl. Sudirman No. 456, Jakarta Selatan, DKI Jakarta",
    lat: -6.2291,
    lng: 106.8227,
    logo: "/images/umkm/fashion-logo.jpg",
    banner: "/images/umkm/fashion-banner.jpg",
    rating: 4.2,
    businessHours: [
      { day: "Senin", open: "10:00", close: "20:00", isClosed: false },
      { day: "Selasa", open: "10:00", close: "20:00", isClosed: false },
      { day: "Rabu", open: "10:00", close: "20:00", isClosed: false },
      { day: "Kamis", open: "10:00", close: "20:00", isClosed: false },
      { day: "Jumat", open: "10:00", close: "20:00", isClosed: false },
      { day: "Sabtu", open: "09:00", close: "18:00", isClosed: false },
      { day: "Minggu", open: "00:00", close: "00:00", isClosed: true },
    ],
    products: [],
    ownerId: "user3",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "umkm3",
    slug: "toko-kerajinan-nusantara",
    name: "Toko Kerajinan Nusantara",
    description:
      "Kerajinan tangan tradisional Indonesia dengan sentuhan modern. Menjual berbagai produk kerajinan dari berbagai daerah di Indonesia.",
    category: "craft",
    phone: "+628999888777",
    email: "kerajinan.nusantara@email.com",
    address: "Jl. Asia Afrika No. 789, Bandung, Jawa Barat",
    lat: -6.9175,
    lng: 107.6191,
    logo: "/images/umkm/craft-logo.jpg",
    banner: "/images/umkm/craft-banner.jpg",
    rating: 4.8,
    businessHours: [
      { day: "Senin", open: "09:00", close: "18:00", isClosed: false },
      { day: "Selasa", open: "09:00", close: "18:00", isClosed: false },
      { day: "Rabu", open: "09:00", close: "18:00", isClosed: false },
      { day: "Kamis", open: "09:00", close: "18:00", isClosed: false },
      { day: "Jumat", open: "09:00", close: "17:00", isClosed: false },
      { day: "Sabtu", open: "10:00", close: "16:00", isClosed: false },
      { day: "Minggu", open: "00:00", close: "00:00", isClosed: true },
    ],
    products: [],
    ownerId: "user1",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
];

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: "product1",
    name: "Kopi Arabika Gayo",
    description:
      "Kopi arabika asal Gayo dengan rasa bold dan aroma yang harum. Diproses secara manual untuk menjaga kualitas dan cita rasa asli.",
    price: 25000,
    originalPrice: 30000,
    images: [
      "/images/products/coffee-arabika-1.jpg",
      "/images/products/coffee-arabika-2.jpg",
    ],
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
  {
    id: "product2",
    name: "Kopi Latte Special",
    description:
      "Kopi latte dengan racikan khusus dan latte art yang menarik. Perfect untuk pecinta kopi susu dengan rasa yang creamy.",
    price: 35000,
    images: [
      "/images/products/latte-special-1.jpg",
      "/images/products/latte-special-2.jpg",
    ],
    category: "beverage",
    umkmId: "umkm1",
    isAvailable: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "product3",
    name: "Kaos Casual Modern",
    description:
      "Kaos casual dengan bahan cotton combed 30s yang nyaman. Desain simple dan elegant untuk sehari-hari.",
    price: 89000,
    originalPrice: 120000,
    images: [
      "/images/products/kaos-casual-1.jpg",
      "/images/products/kaos-casual-2.jpg",
    ],
    category: "clothing",
    umkmId: "umkm2",
    isAvailable: true,
    discount: {
      id: "discount2",
      type: "percentage",
      value: 25,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-06-30"),
      isActive: true,
    },
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "product4",
    name: "Kerajinan Anyaman Bambu",
    description:
      "Kerajinan anyaman bambu tradisional dengan motif modern. Cocok untuk dekorasi rumah atau hadiah.",
    price: 150000,
    images: [
      "/images/products/anyaman-bambu-1.jpg",
      "/images/products/anyaman-bambu-2.jpg",
    ],
    category: "craft",
    umkmId: "umkm3",
    isAvailable: true,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
];

// Add products to UMKM
mockUMKM[0].products = mockProducts.filter((p) => p.umkmId === "umkm1");
mockUMKM[1].products = mockProducts.filter((p) => p.umkmId === "umkm2");
mockUMKM[2].products = mockProducts.filter((p) => p.umkmId === "umkm3");

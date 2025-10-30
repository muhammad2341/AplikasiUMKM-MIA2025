// UMKM Categories
export const CATEGORIES = [
  {
    value: "food",
    label: "🍔 Makanan & Minuman",
    color: "bg-red-100 text-red-800",
  },
  { value: "fashion", label: "👕 Fashion", color: "bg-blue-100 text-blue-800" },
  {
    value: "craft",
    label: "🎨 Kerajinan Tangan",
    color: "bg-purple-100 text-purple-800",
  },
  { value: "service", label: "🔧 Jasa", color: "bg-green-100 text-green-800" },
  {
    value: "retail",
    label: "🛍️ Retail",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "health",
    label: "💄 Kesehatan & Kecantikan",
    color: "bg-pink-100 text-pink-800",
  },
  {
    value: "electronic",
    label: "📱 Elektronik",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    value: "automotive",
    label: "🚗 Otomotif",
    color: "bg-gray-100 text-gray-800",
  },
  {
    value: "education",
    label: "📚 Pendidikan",
    color: "bg-orange-100 text-orange-800",
  },
  { value: "other", label: "📦 Lainnya", color: "bg-gray-100 text-gray-800" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

// Locations
export const CITIES = [
  "Jakarta Pusat",
  "Jakarta Selatan",
  "Jakarta Barat",
  "Jakarta Timur",
  "Jakarta Utara",
  "Bandung",
  "Surabaya",
  "Medan",
  "Semarang",
  "Makassar",
];

export const PROVINCES = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Sumatera Utara",
  "Sulawesi Selatan",
];

// Business Hours Template
export const BUSINESS_HOURS_TEMPLATE = [
  { day: "Senin", open: "08:00", close: "17:00", isClosed: false },
  { day: "Selasa", open: "08:00", close: "17:00", isClosed: false },
  { day: "Rabu", open: "08:00", close: "17:00", isClosed: false },
  { day: "Kamis", open: "08:00", close: "17:00", isClosed: false },
  { day: "Jumat", open: "08:00", close: "17:00", isClosed: false },
  { day: "Sabtu", open: "09:00", close: "15:00", isClosed: false },
  { day: "Minggu", open: "00:00", close: "00:00", isClosed: true },
];

// Product Categories
export const PRODUCT_CATEGORIES = [
  { value: "beverage", label: "🥤 Minuman" },
  { value: "food", label: "🍔 Makanan" },
  { value: "snack", label: "🍪 Snack" },
  { value: "clothing", label: "👕 Pakaian" },
  { value: "accessories", label: "💍 Aksesoris" },
  { value: "electronics", label: "📱 Elektronik" },
  { value: "home", label: "🏠 Perlengkapan Rumah" },
  { value: "beauty", label: "💄 Kecantikan" },
  { value: "health", label: "💊 Kesehatan" },
  { value: "other", label: "📦 Lainnya" },
];

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },
  UMKM: {
    LIST: "/api/umkm",
    DETAIL: (id: string) => `/api/umkm/${id}`,
    SEARCH: "/api/umkm/search",
    CATEGORIES: "/api/umkm/categories",
  },
  PRODUCTS: {
    LIST: "/api/products",
    DETAIL: (id: string) => `/api/products/${id}`,
    SEARCH: "/api/products/search",
    FEATURED: "/api/products/featured",
  },
  FAVORITES: {
    LIST: "/api/favorites",
    TOGGLE: (id: string) => `/api/favorites/${id}`,
  },
};

// App Configuration
export const APP_CONFIG = {
  SITE_NAME: "UMKM Directory",
  SITE_DESCRIPTION: "Platform directory untuk UMKM lokal",
  CONTACT_EMAIL: "info@umkmdirectory.com",
  SUPPORT_PHONE: "+622112345678",
  SOCIAL_MEDIA: {
    INSTAGRAM: "https://instagram.com/umkmdirectory",
    FACEBOOK: "https://facebook.com/umkmdirectory",
    TWITTER: "https://twitter.com/umkmdirectory",
  },
};

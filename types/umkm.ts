export interface UMKM {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  phone: string;
  email: string;
  address: string;
  lat: number;
  lng: number;
  logo: string;
  banner: string;
  rating: number;
  businessHours: BusinessHour[];
  products: Product[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  umkmId: string;
  isAvailable: boolean;
  discount?: Discount;
  createdAt: Date;
  updatedAt: Date;
}

export interface Discount {
  id: string;
  type: "percentage" | "fixed";
  value: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

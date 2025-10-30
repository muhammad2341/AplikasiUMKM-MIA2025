export type UserRole = "customer" | "seller";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string; // field password wajib
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

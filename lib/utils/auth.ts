// Simple JWT utilities for demo
const JWT_SECRET = "umkm-directory-secret-key";

export function generateToken(payload: any): string {
  // Simple token generation for demo
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payloadEncoded = btoa(JSON.stringify(payload));
  const signature = btoa(JWT_SECRET);
  return `${header}.${payloadEncoded}.${signature}`;
}

export function verifyToken(token: string): any {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  // For demo purposes - in real app use bcrypt
  return Promise.resolve(btoa(password));
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  // For demo purposes - in real app use bcrypt
  return Promise.resolve(btoa(password) === hashedPassword);
}

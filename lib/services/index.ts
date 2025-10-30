import { UMKM, Product } from "@/types";

// WhatsApp Service
export function openWhatsApp(phone: string, message: string = "") {
  const formattedPhone = phone.replace(/\D/g, "");
  const url = `https://wa.me/${formattedPhone}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
  window.open(url, "_blank");
}

export function generateOrderMessage(
  umkmName: string,
  productName: string,
  quantity: number
): string {
  return `Halo ${umkmName}, saya ingin memesan:

${productName}
Jumlah: ${quantity}

Bisa info lebih lanjut?`;
}

export function generateInquiryMessage(umkmName: string): string {
  return `Halo ${umkmName}, saya tertarik dengan produk/layanan Anda. Bisa info lebih lanjut?`;
}

// Maps Service
export function openGoogleMaps(lat: number, lng: number, label: string = "") {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}${
    label ? `&query=${encodeURIComponent(label)}` : ""
  }`;
  window.open(url, "_blank");
}

export function getStaticMapUrl(
  lat: number,
  lng: number,
  width: number = 400,
  height: number = 200
): string {
  // Note: You need to add your Google Maps API key
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=${width}x${height}&markers=color:red%7C${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`;
}

export function getDirectionsUrl(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): string {
  return `https://www.google.com/maps/dir/${fromLat},${fromLng}/${toLat},${toLng}`;
}

// Analytics Service
export function trackPageView(page: string) {
  console.log("Page viewed:", page);
  // In real app, integrate with Google Analytics, etc.
}

export function trackUMKMView(umkmId: string) {
  console.log("UMKM viewed:", umkmId);
  // Track UMKM views for analytics
}

export function trackContactClick(
  umkmId: string,
  method: "whatsapp" | "call" | "maps"
) {
  console.log("Contact clicked:", { umkmId, method });
  // Track contact methods for analytics
}

export function trackProductView(productId: string) {
  console.log("Product viewed:", productId);
  // Track product views for analytics
}

// Storage Service
export function saveToLocalStorage(key: string, data: any) {
  try {
    localStorage.setItem(`umkm-${key}`, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function loadFromLocalStorage(key: string): any {
  try {
    const data = localStorage.getItem(`umkm-${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return null;
  }
}

export function removeFromLocalStorage(key: string) {
  try {
    localStorage.removeItem(`umkm-${key}`);
  } catch (error) {
    console.error("Failed to remove from localStorage:", error);
  }
}

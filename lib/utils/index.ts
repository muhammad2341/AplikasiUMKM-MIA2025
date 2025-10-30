import { BusinessHour, Discount } from "@/types";

// Date & Time Utilities
export function isStoreOpen(businessHours: BusinessHour[]): boolean {
  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const today = days[now.getDay()];
  const currentTime = now.toTimeString().slice(0, 5);

  const todaySchedule = businessHours.find((hour) => hour.day === today);

  if (!todaySchedule || todaySchedule.isClosed) return false;

  return (
    currentTime >= todaySchedule.open && currentTime <= todaySchedule.close
  );
}

export function getTimeUntilOpenClose(businessHours: BusinessHour[]): {
  status: "open" | "closed" | "closing_soon";
  message: string;
} {
  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const today = days[now.getDay()];
  const currentTime = now.toTimeString().slice(0, 5);

  const todaySchedule = businessHours.find((hour) => hour.day === today);

  if (!todaySchedule || todaySchedule.isClosed) {
    return { status: "closed", message: "Tutup hari ini" };
  }

  if (currentTime < todaySchedule.open) {
    return { status: "closed", message: `Buka pukul ${todaySchedule.open}` };
  }

  if (currentTime > todaySchedule.close) {
    return { status: "closed", message: "Sudah tutup" };
  }

  // Check if closing within 1 hour
  const closeTime = new Date(`1970-01-01T${todaySchedule.close}:00`);
  const currentTimeDate = new Date(`1970-01-01T${currentTime}:00`);
  const timeUntilClose = closeTime.getTime() - currentTimeDate.getTime();
  const oneHour = 60 * 60 * 1000;

  if (timeUntilClose <= oneHour) {
    return {
      status: "closing_soon",
      message: `Segera tutup (${todaySchedule.close})`,
    };
  }

  return { status: "open", message: `Buka sampai ${todaySchedule.close}` };
}

// Discount Utilities
export function calculateDiscountPrice(
  originalPrice: number,
  discount: Discount
): number {
  if (!discount || !discount.isActive) return originalPrice;

  if (discount.type === "percentage") {
    return originalPrice - (originalPrice * discount.value) / 100;
  } else {
    return originalPrice - discount.value;
  }
}

export function isDiscountActive(discount?: Discount): boolean {
  if (!discount) return false;

  const now = new Date();
  const start = new Date(discount.startDate);
  const end = new Date(discount.endDate);

  return discount.isActive && now >= start && now <= end;
}

export function getTimeRemaining(endDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const difference = end - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

// Formatting Utilities
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format Indonesian phone numbers
  if (cleaned.startsWith("62")) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith("0")) {
    return `+62${cleaned.slice(1)}`;
  } else {
    return `+${cleaned}`;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

// Validation Utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password harus minimal 8 karakter");
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Password harus mengandung huruf kecil");
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Password harus mengandung huruf besar");
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push("Password harus mengandung angka");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Location Utilities
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

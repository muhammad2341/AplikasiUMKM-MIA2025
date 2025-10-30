"use client";
import { Product } from "@/types/product";
import { UMKM } from "@/types/umkm";
import { openWhatsApp } from "@/lib/services";

interface ContactButtonsProps {
  umkm: UMKM;
  product?: Product;
  size?: "sm" | "md" | "lg";
}

export default function ContactButtons({
  umkm,
  product,
  size = "md",
}: ContactButtonsProps) {
  const sizeClasses: Record<"sm" | "md" | "lg", string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const handleWhatsApp = () => {
    const productName = product ? `produk ${product.name}` : "UMKM Anda";
    const discountInfo =
      product?.discount?.isActive && product.discount?.value
        ? ` yang sedang diskon ${product.discount.value}${
            product.discount.type === "percentage" ? "%" : "Rp"
          }`
        : "";

    const message = `Halo ${umkm.name}, saya tertarik dengan ${productName}${discountInfo}. Bisa info lebih lanjut?`;

    if (!umkm.phone) {
      alert("Nomor WhatsApp UMKM belum tersedia.");
      return;
    }

    openWhatsApp(umkm.phone, message);
  };

  const handleCall = () => {
    if (!umkm.phone) {
      alert("Nomor telepon UMKM belum tersedia.");
      return;
    }
    window.open(`tel:${umkm.phone}`, "_blank");
  };

  const handleMaps = () => {
    if (!umkm.address) {
      alert("Alamat UMKM belum tersedia.");
      return;
    }

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      umkm.address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleWhatsApp}
        className={`bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center ${sizeClasses[size]}`}
      >
        <span className="mr-2">💬</span>
        WhatsApp
      </button>

      <button
        onClick={handleCall}
        className={`bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center ${sizeClasses[size]}`}
      >
        <span className="mr-2">📞</span>
        Telepon
      </button>

      <button
        onClick={handleMaps}
        className={`bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center ${sizeClasses[size]}`}
      >
        <span className="mr-2">📍</span>
        Maps
      </button>
    </div>
  );
}

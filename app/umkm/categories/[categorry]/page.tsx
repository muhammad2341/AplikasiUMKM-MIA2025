"use client";
import { useParams } from "next/navigation";
import { useUMKM } from "@/hooks/useUMKM";
import UMKMCard from "@/components/umkm/UMKMCard";
import Loading from "@/components/ui/Loading";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const { umkm, getUMKMByCategory, loading } = useUMKM();

  const categoryUMKM = getUMKMByCategory(category);
  const categoryInfo = CATEGORIES.find((cat) => cat.value === category);

  if (loading) {
    return <Loading text="Memuat UMKM..." />;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-4xl">{categoryInfo?.icon}</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {categoryInfo?.label}
            </h1>
            <p className="text-gray-600 mt-2">
              Temukan UMKM {categoryInfo?.label.toLowerCase()} terdekat
            </p>
          </div>
        </div>
      </div>

      {/* UMKM Grid */}
      {categoryUMKM.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryUMKM.map((umkm) => (
            <UMKMCard key={umkm.id} umkm={umkm} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏷️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum ada UMKM di kategori ini
          </h3>
          <p className="text-gray-600 mb-4">
            UMKM {categoryInfo?.label.toLowerCase()} akan muncul di sini
          </p>
          <a
            href="/umkm"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Lihat Semua Kategori
          </a>
        </div>
      )}

      {/* Category Description */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          Tentang Kategori {categoryInfo?.label}
        </h3>
        <p className="text-blue-700 text-sm">
          Kategori {categoryInfo?.label} mencakup berbagai UMKM yang bergerak di
          bidang {categoryInfo?.label.toLowerCase()}. Dukung usaha lokal dengan
          membeli produk dan layanan dari UMKM terdekat.
        </p>
      </div>
    </div>
  );
}

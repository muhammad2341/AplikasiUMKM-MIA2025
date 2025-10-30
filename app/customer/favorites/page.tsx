import { useEffect, useState } from "react";
import UMKMCard from "@/components/umkm/UMKMCard";
import { getUserFavorites, getUMKMById } from "@/lib/database/db";
import { useSession } from "next-auth/react";

export default function CustomerFavoritesPage() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      Promise.resolve().then(() => {
        setFavorites(getUserFavorites(session.user?.email ?? ""));
        setLoading(false);
      });
    } else {
      Promise.resolve().then(() => {
        setLoading(false);
      });
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">UMKM Favorit Saya</h1>
      <p className="text-gray-600 mb-4">Daftar UMKM yang Anda favoritkan</p>
      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
          <p className="text-gray-500 mb-4">Belum ada UMKM favorit</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((umkmId) => {
            const umkm = getUMKMById(umkmId);
            return umkm ? <UMKMCard key={umkmId} umkm={umkm} /> : null;
          })}
        </div>
      )}
    </div>
  );
}

"use client";
import { useParams } from "next/navigation";
import { useUMKMDetail } from "@/hooks/useUMKM";
import UMKMDetail from "@/components/umkm/UMKMDetail";
import Loading from "@/components/ui/Loading";
import { trackUMKMView } from "@/lib/database/db";
import { useEffect } from "react";

export default function UMKMPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { umkm, loading, error } = useUMKMDetail(slug);

  useEffect(() => {
    if (umkm) {
      trackUMKMView(umkm.id);
    }
  }, [umkm]);

  if (loading) {
    return <Loading text="Memuat detail UMKM..." />;
  }

  if (error || !umkm) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          UMKM tidak ditemukan
        </h1>
        <p className="text-gray-600 mb-8">
          UMKM yang Anda cari tidak ditemukan atau mungkin sudah tidak aktif.
        </p>
        <a
          href="/umkm"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Kembali ke Directory
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <UMKMDetail umkm={umkm} />
    </div>
  );
}

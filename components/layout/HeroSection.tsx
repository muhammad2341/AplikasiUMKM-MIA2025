import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Temukan UMKM Terdekat
          <br />
          <span className="text-blue-200">Dukung Produk Lokal</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Jelajahi usaha kecil menengah di sekitarmu dan temukan produk
          berkualitas langsung dari pelaku usaha lokal
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/umkm"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg"
          >
            Jelajahi UMKM
          </Link>
          <Link
            href="/umkm/map"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
          >
            Lihat Peta
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-blue-200">UMKM Terdaftar</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">200+</div>
            <div className="text-blue-200">Produk Lokal</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">5K+</div>
            <div className="text-blue-200">Pengunjung</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">4.8</div>
            <div className="text-blue-200">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}

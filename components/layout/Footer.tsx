import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UMKM</span>
              </div>
              <span className="text-xl font-bold">UMKM Directory</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Platform directory untuk menemukan dan mendukung UMKM lokal di
              sekitarmu. Dukung produk lokal dan temukan usaha terdekat.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/umkm"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Directory UMKM
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/umkm/map"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Peta
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Kontak
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: info@umkmdirectory.com</li>
              <li className="text-gray-300">Telepon: (021) 1234-5678</li>
              <li className="text-gray-300">Jam Operasional: 08:00 - 17:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-300 text-sm text-center">
            © 2024 UMKM Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

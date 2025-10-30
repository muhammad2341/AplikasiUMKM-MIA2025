// components/seller/SellerSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/seller/dashboard", icon: "📊" },
  { name: "Profil", href: "/seller/profile", icon: "🏪" },
  { name: "Produk", href: "/seller/products", icon: "📦" },
  { name: "Analytics", href: "/seller/analytics", icon: "📈" },
];

export default function SellerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  return (
    <div className="hidden lg:flex lg:shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          {/* Logo & Store Info */}
          <div className="flex items-center shrink-0 px-6">
            <div className="shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">
                {session?.user?.storeName || "Toko UMKM"}
              </h1>
              <p className="text-sm text-gray-500">Seller Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 flex flex-col">
            <div className="px-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className="shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {session?.user?.name || "Nama Pengguna"}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  {session?.user?.email || "email@contoh.com"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-3 shrink-0 text-gray-400 hover:text-gray-500"
                title="Logout"
              >
                <span className="text-lg">🚪</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

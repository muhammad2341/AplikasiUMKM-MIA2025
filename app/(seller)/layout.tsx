// app/(seller)/layout.tsx
import AuthGuard from "@/components/auth/AuthGuard";
import SellerSidebar from "./SellerSidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard role="seller">
      <div className="flex min-h-screen bg-gray-50">
        <SellerSidebar />
        <div className="flex-1 flex flex-col lg:pl-64">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}

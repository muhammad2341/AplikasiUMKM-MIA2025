import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Register</h1>
        <p className="text-gray-600 mb-6">Daftarkan akun UMKM Anda</p>
        <RegisterForm />
      </div>
    </div>
  );
}

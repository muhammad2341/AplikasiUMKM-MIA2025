import ProfileForm from "@/components/shared/ProfileForm";
import { useSession } from "next-auth/react";

export default function CustomerProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Profil Saya</h1>
      <p className="text-gray-600 mb-6">
        Kelola data dan identitas akun customer Anda
      </p>
      <ProfileForm user={session?.user} />
    </div>
  );
}

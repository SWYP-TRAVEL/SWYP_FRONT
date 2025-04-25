'use client'

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProtectedPageClient() {
  useAuthGuard();
  const user = useAuthStore((state) => state.user);

  if (!user) return <p className="p-4">인증 확인 중...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎉 대시보드</h1>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/use-user-store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const jsonWebToken = useUserStore((state) => state.jsonWebToken);
  const isHydrated = useUserStore((state) => state.isHydrated);

  useEffect(() => {
    // 세션스토리지의 상태가 로드된 후에 체크
    if (!isHydrated) {
      return;
    }

    // 클라이언트 사이드 하이드레이션 후 추가 검증
    const validateAuth = async () => {
      try {
        if (!user || !jsonWebToken) {
          router.replace("/login");
          return;
        }
        // 필요한 경우 토큰 유효성 검증 추가
      } catch (error) {
        console.error("Auth validation failed:", error);
        router.replace("/login");
      }
    };

    validateAuth();
  }, [user, jsonWebToken, router, isHydrated]);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}

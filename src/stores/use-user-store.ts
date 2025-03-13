import { createJSONStorage, persist } from "zustand/middleware";

import { User } from "@/types/user";
import { create } from "zustand";
import { login } from "@/api/user/login";
import toast from "react-hot-toast";

interface UserStore {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  isAdmin: boolean;
  jsonWebToken: string | null;
  isHydrated: boolean;

  login: (account: string, password: string) => Promise<void>;
  setHydrated: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoading: false,
      error: null,
      user: null,
      isAdmin: false,
      jsonWebToken: null,
      isHydrated: false,
      login: async (account: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await login(account, password);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (!response.data.user) {
            toast.error(response.message);
            return;
          }

          set({
            user: response.data!.user,
            jsonWebToken: response.data!.jsonWebToken,
            isAdmin: response.data!.isAdmin,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "로그인 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[useUserStore/login] Login failed.", error);

          set({ user: null, jsonWebToken: null, error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

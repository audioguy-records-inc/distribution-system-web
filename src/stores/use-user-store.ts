import { createJSONStorage, persist } from "zustand/middleware";

import { User } from "@/types/user";
import { create } from "zustand";
import { getUsers } from "@/api/user/get-users";
import { login } from "@/api/user/login";
import toast from "react-hot-toast";

interface UserStore {
  users: User[];
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoading: false,
      error: null,
      users: [],
      fetchUsers: async () => {
        set({ isLoading: true });
        try {
          const response = await getUsers();

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ users: response.data.userList });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "사용자 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {},
    },
  ),
);

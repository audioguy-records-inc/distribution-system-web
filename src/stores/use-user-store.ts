import { createJSONStorage, persist } from "zustand/middleware";

import { User } from "@/types/user";
import { create } from "zustand";
import { getUsers } from "@/api/user/get-users";
import { login } from "@/api/user/login";
import { postUser } from "@/api/user/post-user";
import toast from "react-hot-toast";

interface UserStore {
  users: User[];
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  createUser: (user: User) => Promise<void>;
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

          console.error("[useUserStore/fetchUsers] Fetch users failed.", error);

          set({ users: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createUser: async (user: User) => {
        set({ isLoading: true });
        try {
          const response = await postUser({ userList: [user] });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (response.data.userList.length === 0) {
            throw new Error("사용자 생성 중 알 수 없는 오류가 발생했습니다.");
          }

          set((state) => ({
            users: [...state.users, response.data!.userList[0]],
            error: null,
          }));

          toast.success("사용자가 생성되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "사용자 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[useUserStore/postUser] Post user failed.", error);
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

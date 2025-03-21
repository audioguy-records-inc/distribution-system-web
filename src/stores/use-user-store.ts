import { createJSONStorage, persist } from "zustand/middleware";

import { User } from "@/types/user";
import { create } from "zustand";
import { deleteUser } from "@/api/user/delete-user";
import { getUsers } from "@/api/user/get-users";
import { login } from "@/api/user/login";
import { postUser } from "@/api/user/post-user";
import { putUser } from "@/api/user/put-user";
import { searchUsers } from "@/api/user/search-users";
import toast from "react-hot-toast";

interface UserStore {
  users: User[];
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  createUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  searchUsers: (
    searchKeyword: string,
    searchFields?: string,
  ) => Promise<User[]>;
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

          set({ users: response.data.userList, error: null });
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
      updateUser: async (user: User) => {
        set({ isLoading: true });
        try {
          const response = await putUser({ user });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const fetchResponse = await getUsers();

          if (!fetchResponse || fetchResponse.error || !fetchResponse.data) {
            throw new Error(fetchResponse.message);
          }

          set((state) => ({
            users: fetchResponse.data!.userList,
            error: null,
          }));

          toast.success("사용자가 수정되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "사용자 수정 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[useUserStore/updateUser] Update user failed.", error);
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      deleteUser: async (userId: string) => {
        set({ isLoading: true });
        try {
          const response = await deleteUser({ userId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            users: state.users.filter((user) => user._id !== userId),
            error: null,
          }));

          toast.success("사용자가 삭제되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "사용자 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[useUserStore/deleteUser] Delete user failed.", error);
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      searchUsers: async (searchKeyword: string, searchFields?: string) => {
        set({ isLoading: true });
        try {
          const __searchKeyword = searchKeyword;
          const __searchFields = searchFields;
          const response = await searchUsers({
            __searchKeyword,
            __searchFields,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({
            error: null,
          });

          return response.data.userList;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "사용자 검색 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useUserStore/searchUsers] Search users failed.",
            error,
          );
          set({ error: errorMessage });
          return [];
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

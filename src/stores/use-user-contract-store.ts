import { createJSONStorage, persist } from "zustand/middleware";

import UserContract from "@/types/user-contract";
import { create } from "zustand";
import { deleteUserContract } from "@/api/user-contract/delete-user-contract";
import { filterUserContracts } from "@/api/user-contract/filter-user-contracts";
import { getUserContract } from "@/api/user-contract/get-user-contract";
import { getUserContracts } from "@/api/user-contract/get-user-contracts";
import { postUserContract } from "@/api/user-contract/post-user-contract";
import { putUserContract } from "@/api/user-contract/put-user-contract";
import { searchUserContracts } from "@/api/user-contract/search-user-contracts";
import toast from "react-hot-toast";

interface UserContractStore {
  userContracts: UserContract[];
  isLoading: boolean;
  error: string | null;

  fetchUserContract: (userContractId: string) => Promise<UserContract | null>;
  fetchUserContracts: (searchQuery?: string) => Promise<void>;
  createUserContract: (userContract: UserContract) => Promise<void>;
  updateUserContract: (userContract: UserContract) => Promise<void>;
  deleteUserContract: (userContractId: string) => Promise<void>;
  searchUserContracts: (
    searchKeyword: string,
    searchFields?: string,
  ) => Promise<UserContract[]>;
  filterUserContracts: (query: string) => Promise<UserContract[]>;
}

export const useUserContractStore = create<UserContractStore>()(
  persist(
    (set) => ({
      userContracts: [],
      isLoading: false,
      error: null,
      fetchUserContract: async (userContractId: string) => {
        set({ isLoading: true });
        try {
          const response = await getUserContract({ userContractId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          return response.data.userContract;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "유저 계약 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[fetchUserContract] error", error);
          return null;
        } finally {
          set({ isLoading: false });
        }
      },
      fetchUserContracts: async (searchQuery?: string) => {
        set({ isLoading: true });

        try {
          const response = await getUserContracts(searchQuery);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ userContracts: response.data.userContractList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "유저 계약 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[fetchUserContracts] error", error);

          set({ userContracts: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createUserContract: async (userContract) => {
        set({ isLoading: true });

        try {
          const response = await postUserContract({
            userContractList: [userContract],
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (response.data.userContractList.length === 0) {
            throw new Error(
              "유저 계약 생성 중 알 수 없는 오류가 발생했습니다.",
            );
          }

          set((state) => ({
            userContracts: [
              response.data!.userContractList[0],
              ...state.userContracts,
            ],
            error: null,
          }));

          toast.success("유저 계약이 생성되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "유저 계약 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[createUserContract] error", error);

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      updateUserContract: async (userContract) => {
        set({ isLoading: true });

        try {
          const response = await putUserContract({
            userContract,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const fetchResponse = await getUserContracts();

          if (!fetchResponse || fetchResponse.error || !fetchResponse.data) {
            throw new Error(fetchResponse.message);
          }

          set((state) => ({
            userContracts: fetchResponse.data!.userContractList,
            error: null,
          }));

          toast.success("유저 계약이 수정되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "유저 계약 수정 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[updateUserContract] error", error);

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      deleteUserContract: async (userContractId) => {
        set({ isLoading: true });

        try {
          const response = await deleteUserContract({
            userContractId,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            userContracts: state.userContracts.filter(
              (userContract) => userContract._id !== userContractId,
            ),
            error: null,
          }));

          toast.success("유저 계약이 삭제되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "유저 계약 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[deleteUserContract] error", error);
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      searchUserContracts: async (searchKeyword, searchFields) => {
        set({ isLoading: true });
        try {
          const __searchKeyword = searchKeyword;
          const __searchFields = searchFields;
          const response = await searchUserContracts({
            __searchKeyword,
            __searchFields,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({
            error: null,
          });

          return response.data.userContractList;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "권리자 계약 검색 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[searchUserContracts] error", error);
          set({ error: errorMessage });
          return [];
        } finally {
          set({ isLoading: false });
        }
      },
      filterUserContracts: async (query) => {
        set({ isLoading: true });
        try {
          const response = await filterUserContracts({ query });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({
            error: null,
          });

          return response.data.userContractList;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "유저 계약 검색 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[filterUserContracts] error", error);
          set({ error: errorMessage });
          return [];
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-contract",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

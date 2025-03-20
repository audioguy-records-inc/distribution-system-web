import { createJSONStorage, persist } from "zustand/middleware";

import UserContract from "@/types/user-contract";
import { create } from "zustand";
import { deleteUserContract } from "@/api/user-contract/delete-user-contract";
import { getUserContracts } from "@/api/user-contract/get-user-contracts";
import { postUserContract } from "@/api/user-contract/post-user-contract";
import { putUserContract } from "@/api/user-contract/put-user-contract";
import toast from "react-hot-toast";

interface UserContractStore {
  userContracts: UserContract[];
  isLoading: boolean;
  error: string | null;

  fetchUserContracts: () => Promise<void>;
  createUserContract: (userContract: UserContract) => Promise<void>;
  updateUserContract: (userContract: UserContract) => Promise<void>;
  deleteUserContract: (userContractId: string) => Promise<void>;
}

export const useUserContractStore = create<UserContractStore>()(
  persist(
    (set) => ({
      userContracts: [],
      isLoading: false,
      error: null,
      fetchUserContracts: async () => {
        set({ isLoading: true });

        try {
          const response = await getUserContracts();

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
              ...state.userContracts,
              response.data!.userContractList[0],
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
    }),
    {
      name: "user-contract",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

import { createJSONStorage, persist } from "zustand/middleware";

import DspContract from "@/types/dsp-contract";
import { create } from "zustand";
import { deleteDspContract } from "@/api/dsp-contract/delete-dsp-contract";
import { getDspContracts } from "@/api/dsp-contract/get-dsp-contracts";
import { postDspContract } from "@/api/dsp-contract/post-dsp-contract";
import { putDspContract } from "@/api/dsp-contract/put-dsp-contract";
import toast from "react-hot-toast";

interface DspContractStore {
  dspContracts: DspContract[];
  isLoading: boolean;
  error: string | null;

  fetchDspContracts: () => Promise<void>;
  createDspContract: (dspContract: DspContract) => Promise<void>;
  updateDspContract: (dspContract: DspContract) => Promise<void>;
  deleteDspContract: (dspContractId: string) => Promise<void>;
}

export const useDspContractStore = create<DspContractStore>()(
  persist(
    (set) => ({
      dspContracts: [],
      isLoading: false,
      error: null,
      fetchDspContracts: async () => {
        set({ isLoading: true });

        try {
          const response = await getDspContracts();

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ dspContracts: response.data.dspContractList, error: null });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "DSP 계약 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[getDspContracts] error", error);

          set({ dspContracts: [], error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createDspContract: async (dspContract) => {
        set({ isLoading: true });

        try {
          const response = await postDspContract({
            dspContractList: [dspContract],
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          if (response.data.dspContractList.length === 0) {
            throw new Error("DSP 계약 생성 중 알 수 없는 오류가 발생했습니다.");
          }

          set((state) => ({
            dspContracts: [
              ...state.dspContracts,
              response.data!.dspContractList[0],
            ],
            error: null,
          }));

          toast.success("DSP 계약이 생성되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "DSP 계약 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[createDspContract] error", error);
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      updateDspContract: async (dspContract) => {
        set({ isLoading: true });

        try {
          const response = await putDspContract({
            dspContract,
          });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          const fetchResponse = await getDspContracts();

          if (!fetchResponse || fetchResponse.error || !fetchResponse.data) {
            throw new Error(fetchResponse.message);
          }

          set((state) => ({
            dspContracts: fetchResponse.data!.dspContractList,
            error: null,
          }));

          toast.success("DSP 계약이 수정되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "DSP 계약 수정 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[updateDspContract] error", error);
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      deleteDspContract: async (dspContractId) => {
        set({ isLoading: true });

        try {
          const response = await deleteDspContract({
            dspContractId,
          });

          if (!response || response.error) {
            throw new Error(response.message);
          }

          set((state) => ({
            dspContracts: state.dspContracts.filter(
              (dspContract) => dspContract._id !== dspContractId,
            ),
            error: null,
          }));

          toast.success("DSP 계약이 삭제되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "DSP 계약 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[deleteDspContract] error", error);
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "dsp-contract",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

import { createJSONStorage, persist } from "zustand/middleware";

import DspContract from "@/types/dsp-contract";
import { create } from "zustand";
import { getDspContracts } from "@/api/dsp-contract/get-dsp-contracts";
import toast from "react-hot-toast";

interface DspContractStore {
  dspContracts: DspContract[];
  isLoading: boolean;
  error: string | null;

  fetchDspContracts: () => Promise<void>;
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
          console.log("moonsae response", response);
          if (response.error) {
            throw new Error(response.message);
          }

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ dspContracts: response.data.dspContractList });
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
    }),
    {
      name: "dsp-contract",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

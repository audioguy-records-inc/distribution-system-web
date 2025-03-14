import { createJSONStorage, persist } from "zustand/middleware";

import { Dsp } from "@/types/dsp";
import { create } from "zustand";
import { deleteDsp } from "@/api/dsp/delete-dsp";
import { getDsp } from "@/api/dsp/get-dsp";
import { postDsp } from "@/api/dsp/post-dsp";
import toast from "react-hot-toast";

interface DspStore {
  dsps: Dsp[];
  isLoading: boolean;
  error: string | null;

  fetchDsps: () => Promise<void>;
  createDsp: ({
    name,
    imageOriginalPath,
  }: {
    name: string;
    imageOriginalPath: string;
  }) => Promise<void>;
  deleteDsp: ({ dspId }: { dspId: string }) => Promise<void>;
}

export const useDspStore = create<DspStore>()(
  persist(
    (set) => ({
      dsps: [],
      isLoading: false,
      error: null,
      fetchDsps: async () => {
        set({ isLoading: true });

        try {
          const response = await getDsp();

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({ dsps: response.data?.dspList || [] });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "DSP 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[fetchDsps] error", error);

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      createDsp: async ({ name, imageOriginalPath }) => {
        set({ isLoading: true });

        try {
          const response = await postDsp([{ name, imageOriginalPath }]);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            dsps: [...state.dsps, ...(response.data?.dspList || [])],
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "DSP 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[createDsp] error", error);

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
      deleteDsp: async ({ dspId }) => {
        set({ isLoading: true });

        try {
          const response = await deleteDsp({ dspId });

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set((state) => ({
            dsps: state.dsps.filter((dsp) => dsp._id !== dspId),
          }));

          toast.success("DSP 삭제가 완료되었습니다.");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "DSP 삭제 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error("[deleteDsp] error", error);

          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "dsp",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

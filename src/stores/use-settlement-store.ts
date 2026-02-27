import {
  DeleteSettlementFileRequest,
  deleteSettlementFile,
} from "@/api/settlement/delete-settlement-file";
import {
  GetSettlementAdminInvoicesRequest,
  getSettlementAdminInvoices,
} from "@/api/settlement/get-settlement-admin-invoices";
import {
  GetSettlementDetailsRequest,
  getSettlementDetails,
} from "@/api/settlement/get-settlement-details";
import {
  GetSettlementFilesRequest,
  getSettlementFiles,
} from "@/api/settlement/get-settlement-files";
import {
  GetSettlementSummariesRequest,
  getSettlementSummaries,
} from "@/api/settlement/get-settlement-summaries";
import {
  GetSettlementTaxInvoicesRequest,
  getSettlementTaxInvoices,
} from "@/api/settlement/get-settlement-tax-invoices";
import {
  PostSettlementFilesRequest,
  postSettlementFiles,
} from "@/api/settlement/post-settlement-files";
import {
  SettlementAdminInvoice,
  SettlementDetail,
  SettlementTaxInvoice,
} from "@/types/settlement-matched-record";

import { SettlementFile } from "@/types/settlement-file";
import { SettlementSummary } from "@/types/settlement-summary";
import { create } from "zustand";
import toast from "react-hot-toast";
import { t } from "@/i18n/client";

interface SettlementStore {
  settlementDetails: SettlementDetail[];
  loadingMoreStatus: "idle" | "loading" | "done" | "error";
  settlementTaxInvoices: SettlementTaxInvoice[];
  settlementAdminInvoices: SettlementAdminInvoice[];
  settlementSummaries: SettlementSummary[];
  settlementFiles: SettlementFile[];
  isLoading: boolean;
  error: string | null;

  fetchSettlementDetails: (
    request: GetSettlementDetailsRequest,
  ) => Promise<void>;

  fetchSettlementTaxInvoices: (
    request: GetSettlementTaxInvoicesRequest,
  ) => Promise<void>;

  fetchSettlementAdminInvoices: (
    request: GetSettlementAdminInvoicesRequest,
  ) => Promise<void>;

  fetchSettlementSummaries: (
    request: GetSettlementSummariesRequest,
  ) => Promise<void>;

  createSettlementFiles: (request: PostSettlementFilesRequest) => Promise<void>;

  fetchSettlementFiles: (request?: GetSettlementFilesRequest) => Promise<void>;

  deleteSettlementFile: (request: DeleteSettlementFileRequest) => Promise<void>;

  reset: () => void;
}

export const useSettlementStore = create<SettlementStore>()((set, get) => ({
  settlementDetails: [],
  loadingMoreStatus: "idle",
  settlementTaxInvoices: [],
  settlementAdminInvoices: [],
  settlementSummaries: [],
  settlementFiles: [],
  isLoading: false,
  error: null,

  fetchSettlementDetails: async (request) => {
    const limit = request.__limit || 100;
    set({ isLoading: true, settlementDetails: [], loadingMoreStatus: "loading" });
    try {
      const response = await getSettlementDetails({ ...request, __skip: 0 });

      if (!response || response.error || !response.data) {
        throw new Error(response.message);
      }

      const firstBatch = response.data.settlementDetailList;
      set({
        settlementDetails: firstBatch,
        error: null,
      });

      // 첫 배치가 limit만큼 왔으면 나머지를 백그라운드로 병렬로 가져옴
      if (firstBatch.length >= limit) {
        set({ isLoading: false });
        let allData = [...firstBatch];
        let currentSkip = firstBatch.length;
        let hasMore = true;
        const CONCURRENT = 5;

        while (hasMore) {
          const promises = Array.from({ length: CONCURRENT }, (_, i) =>
            getSettlementDetails({ ...request, __skip: currentSkip + i * limit }),
          );

          const responses = await Promise.all(promises);

          for (const resp of responses) {
            if (!resp || resp.error || !resp.data) {
              set({ loadingMoreStatus: "error" });
              return;
            }

            const batch = resp.data.settlementDetailList;
            if (batch.length > 0) {
              allData = [...allData, ...batch];
            }
            if (batch.length < limit) {
              hasMore = false;
              break;
            }
          }

          currentSkip = allData.length;
          set({ settlementDetails: allData });
        }
      }

      set({ loadingMoreStatus: "done" });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("toast.settlement.detailError");

      toast.error(errorMessage);

      console.error(
        "[useSettlementStore/fetchSettlementDetails] error",
        error,
      );

      set({ settlementDetails: [], error: errorMessage, loadingMoreStatus: "error" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSettlementTaxInvoices: async (request) => {
    set({ isLoading: true });
    try {
      const response = await getSettlementTaxInvoices(request);

      if (!response || response.error || !response.data) {
        throw new Error(response.message);
      }

      set({
        settlementTaxInvoices: response.data.settlementTaxInvoiceList,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("toast.settlement.taxError");

      toast.error(errorMessage);

      console.error(
        "[useSettlementStore/fetchSettlementTaxInvoices] error",
        error,
      );

      set({ settlementTaxInvoices: [], error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSettlementAdminInvoices: async (request) => {
    set({ isLoading: true });
    try {
      const response = await getSettlementAdminInvoices(request);

      if (!response || response.error || !response.data) {
        throw new Error(response.message);
      }

      set({
        settlementAdminInvoices: response.data.settlementAdminInvoiceList,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("toast.settlement.adminError");

      toast.error(errorMessage);

      console.error(
        "[useSettlementStore/fetchSettlementAdminInvoices] error",
        error,
      );
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSettlementSummaries: async (request) => {
    set({ isLoading: true });
    try {
      const response = await getSettlementSummaries(request);

      if (!response || response.error || !response.data) {
        throw new Error(response.message);
      }

      set({
        settlementSummaries: response.data.settlementDetailList,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("toast.settlement.summaryError");

      toast.error(errorMessage);

      console.error(
        "[useSettlementStore/fetchSettlementSummaries] error",
        error,
      );

      set({ settlementSummaries: [], error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  createSettlementFiles: async (request) => {
    set({ isLoading: true });
    try {
      const response = await postSettlementFiles(request);

      if (!response || response.error || !response.data) {
        throw new Error(response.message);
      }

      toast.success(t("toast.settlement.uploaded"));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("toast.settlement.createError");

      toast.error(errorMessage);

      console.error(
        "[useSettlementStore/createSettlementFiles] error",
        error,
      );
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSettlementFiles: async (request = {}) => {
    set({ isLoading: true });
    try {
      const response = await getSettlementFiles(request);

      if (!response || response.error || !response.data) {
        throw new Error(response.message);
      }

      set({
        settlementFiles: response.data.settlementFileList,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("toast.settlement.listError");

      toast.error(errorMessage);

      console.error(
        "[useSettlementStore/fetchSettlementFiles] error",
        error,
      );

      set({ settlementFiles: [], error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSettlementFile: async (request) => {
    set({ isLoading: true });
    try {
      const response = await deleteSettlementFile(request);

      if (!response || response.error || !response.data) {
        throw new Error(response.message);
      }

      // 삭제된 파일을 리스트에서 제거
      set((state) => ({
        settlementFiles: state.settlementFiles.filter(
          (file) => file._id !== request.settlementFileId,
        ),
        error: null,
      }));

      toast.success(t("toast.settlement.fileDeleted"));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("toast.settlement.deleteError");

      toast.error(errorMessage);

      console.error(
        "[useSettlementStore/deleteSettlementFile] error",
        error,
      );

      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {
    set({
      settlementDetails: [],
      loadingMoreStatus: "idle",
      settlementTaxInvoices: [],
      settlementAdminInvoices: [],
      settlementSummaries: [],
      settlementFiles: [],
    });
  },
}));

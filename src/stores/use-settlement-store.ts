import {
  GetSettlementAdminInvoicesRequest,
  getSettlementAdminInvoices,
} from "@/api/settlement/get-settlement-admin-invoices";
import {
  GetSettlementDetailsRequest,
  getSettlementDetails,
} from "@/api/settlement/get-settlement-details";
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

import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface SettlementStore {
  settlementDetails: SettlementDetail[];
  settlementTaxInvoices: SettlementTaxInvoice[];
  settlementAdminInvoices: SettlementAdminInvoice[];
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

  createSettlementFiles: (request: PostSettlementFilesRequest) => Promise<void>;

  reset: () => void;
}

export const useSettlementStore = create<SettlementStore>()(
  persist(
    (set) => ({
      settlementDetails: [],
      settlementTaxInvoices: [],
      settlementAdminInvoices: [],
      isLoading: false,
      error: null,

      fetchSettlementDetails: async (request) => {
        set({ isLoading: true });
        try {
          const response = await getSettlementDetails(request);

          if (!response || response.error || !response.data) {
            throw new Error(response.message);
          }

          set({
            settlementDetails: response.data.settlementDetailList,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "정산 상세 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useSettlementStore/fetchSettlementDetails] error",
            error,
          );

          set({ settlementDetails: [], error: errorMessage });
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
              : "정산 세금 영수증 조회 중 알 수 없는 오류가 발생했습니다.";

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
              : "정산 관리자 조회 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useSettlementStore/fetchSettlementAdminInvoices] error",
            error,
          );
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

          toast.success("정산 파일 생성 완료");
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "정산 파일 생성 중 알 수 없는 오류가 발생했습니다.";

          toast.error(errorMessage);

          console.error(
            "[useSettlementStore/createSettlementFiles] error",
            error,
          );
        } finally {
          set({ isLoading: false });
        }
      },
      reset: () => {
        set({
          settlementDetails: [],
          settlementTaxInvoices: [],
          settlementAdminInvoices: [],
        });
      },
    }),
    {
      name: "settlement",
    },
  ),
);

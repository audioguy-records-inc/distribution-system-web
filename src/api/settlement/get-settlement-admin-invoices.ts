import { FetchResponse, apiFetch } from "../fetch";

import { SettlementAdminInvoice } from "@/types/settlement-matched-record";

export interface GetSettlementAdminInvoicesRequest {
  __kstSettlementStartMonth?: string;
  __kstSettlementEndMonth?: string;
  __limit?: number;
  __skip?: number;
  __sortOption?: string;
}

export interface GetSettlementAdminInvoicesResponse {
  settlementAdminInvoiceList: SettlementAdminInvoice[];
}

export const getSettlementAdminInvoices = async (
  request: GetSettlementAdminInvoicesRequest,
): Promise<FetchResponse<GetSettlementAdminInvoicesResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    if (request.__kstSettlementStartMonth)
      queryParams.append(
        "__kstSettlementStartMonth",
        request.__kstSettlementStartMonth,
      );

    if (request.__kstSettlementEndMonth)
      queryParams.append(
        "__kstSettlementEndMonth",
        request.__kstSettlementEndMonth,
      );

    if (request.__limit) {
      queryParams.append("__limit", request.__limit.toString());
    } else {
      queryParams.append("__limit", "100");
    }

    if (request.__skip) queryParams.append("__skip", request.__skip.toString());

    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    } else {
      queryParams.append("__sortOption", "createdAtDESC");
    }

    const response = await apiFetch<GetSettlementAdminInvoicesResponse>(
      `/settlements/admin-invoices?${queryParams.toString()}`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error) {
    console.error("[getSettlementAdminInvoices] error", error);

    throw error instanceof Error
      ? error
      : new Error("정산 관리자 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

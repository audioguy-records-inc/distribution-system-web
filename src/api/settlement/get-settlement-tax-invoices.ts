import { FetchResponse, apiFetch } from "../fetch";

import { SettlementTaxInvoice } from "@/types/settlement-matched-record";

export enum RegionType {
  DOMESTIC = "domestic",
  INTERNATIONAL = "international",
}

export interface GetSettlementTaxInvoicesRequest {
  regionType?: RegionType;
  __kstSettlementStartMonth?: string;
  __kstSettlementEndMonth?: string;
  __kstSalesStartMonth?: string;
  __kstSalesEndMonth?: string;
  __skip?: number;
  __limit?: number;
  __sortOption?: string;
}

interface GetSettlementTaxInvoicesResponse {
  settlementTaxInvoiceList: SettlementTaxInvoice[];
}

export const getSettlementTaxInvoices = async (
  request: GetSettlementTaxInvoicesRequest,
): Promise<FetchResponse<GetSettlementTaxInvoicesResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    if (request.regionType)
      queryParams.append("regionType", request.regionType);
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
    if (request.__kstSalesStartMonth)
      queryParams.append("__kstSalesStartMonth", request.__kstSalesStartMonth);
    if (request.__kstSalesEndMonth)
      queryParams.append("__kstSalesEndMonth", request.__kstSalesEndMonth);
    if (request.__skip) queryParams.append("__skip", request.__skip.toString());
    if (request.__limit)
      queryParams.append("__limit", request.__limit.toString());
    if (request.__sortOption)
      queryParams.append("__sortOption", request.__sortOption);

    const response = await apiFetch<GetSettlementTaxInvoicesResponse>(
      `/settlements/tax-invoices?${queryParams.toString()}`,
    );

    return response as FetchResponse<GetSettlementTaxInvoicesResponse>;
  } catch (error) {
    console.error("[getSettlementTaxInvoices] error", error);

    throw error instanceof Error
      ? error
      : new Error("정산 세금 영수증 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

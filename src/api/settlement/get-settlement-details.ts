import { FetchResponse, apiFetch } from "../fetch";

import { SettlementDetail } from "@/types/settlement-matched-record";

export interface GetSettlementDetailsRequest {
  __searchKeyword: string;
  __searchFields?: string;
  __kstSettlementStartMonth?: string;
  __kstSettlementEndMonth?: string;
  __skip?: number;
  __limit?: number;
  __sortOption?: string;
}

interface GetSettlementDetailsResponse {
  settlementDetailList: SettlementDetail[];
}

export const getSettlementDetails = async (
  request: GetSettlementDetailsRequest,
): Promise<FetchResponse<GetSettlementDetailsResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    if (request.__searchKeyword)
      queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields)
      queryParams.append("__searchFields", request.__searchFields);
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
    if (request.__skip) queryParams.append("__skip", request.__skip.toString());
    if (request.__limit)
      queryParams.append("__limit", request.__limit.toString());
    else {
      queryParams.append("__limit", "100");
    }
    if (request.__sortOption)
      queryParams.append("__sortOption", request.__sortOption);
    else {
      queryParams.append("__sortOption", "createdAtDESC");
    }

    const url = `/settlements/details?${queryParams.toString()}`;

    const response = await apiFetch(url, {
      method: "GET",
    });

    return response as FetchResponse<GetSettlementDetailsResponse>;
  } catch (error) {
    console.error("[getSettlementDetails] error", error);

    throw error instanceof Error
      ? error
      : new Error("정산 상세 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

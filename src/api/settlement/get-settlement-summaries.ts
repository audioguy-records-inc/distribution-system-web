import { FetchResponse, apiFetch } from "../fetch";

import { SettlementSummary } from "@/types/settlement-summary";

export interface GetSettlementSummariesRequest {
  __searchKeyword?: string;
  __searchFields?: string; // artistList.name, albumTitle, trackTitle
  __kstSettlementStartMonth?: string; // 정산월 시작 YYYYMM 형식
  __kstSettlementEndMonth?: string; // 정산월 끝 YYYYMM 형식
  __skip?: number; // 기본값 0
  __limit?: number; // 기본값 10
  __sortOption?: string; // 기본값 settlementMonthASC
}

interface GetSettlementSummariesResponse {
  settlementDetailList: SettlementSummary[];
}

export const getSettlementSummaries = async (
  request: GetSettlementSummariesRequest,
): Promise<FetchResponse<GetSettlementSummariesResponse>> => {
  try {
    const queryParams = new URLSearchParams();

    if (request.__searchKeyword) {
      queryParams.append("__searchKeyword", request.__searchKeyword);
    }

    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }

    if (request.__kstSettlementStartMonth) {
      queryParams.append(
        "__kstSettlementStartMonth",
        request.__kstSettlementStartMonth,
      );
    }

    if (request.__kstSettlementEndMonth) {
      queryParams.append(
        "__kstSettlementEndMonth",
        request.__kstSettlementEndMonth,
      );
    }

    if (request.__skip) {
      queryParams.append("__skip", request.__skip.toString());
    } else {
      queryParams.append("__skip", "0");
    }

    if (request.__limit) {
      queryParams.append("__limit", request.__limit.toString());
    } else {
      queryParams.append("__limit", "10");
    }

    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    } else {
      queryParams.append("__sortOption", "settlementMonthASC");
    }

    const response = await apiFetch<GetSettlementSummariesResponse>(
      `/settlements/summaries?${queryParams.toString()}`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error) {
    console.error("[getSettlementSummaries] error", error);

    throw error instanceof Error
      ? error
      : new Error("정산 요약 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

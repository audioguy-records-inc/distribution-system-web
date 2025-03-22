import { FetchResponse, apiFetch } from "../fetch";

import DspContract from "@/types/dsp-contract";

interface SearchDspContractRequest {
  __searchKeyword: string;
  __searchFields?: string;
}

interface SearchDspContractResponse {
  dspContractList: DspContract[];
}

export const searchDspContract = async (
  request: SearchDspContractRequest,
): Promise<FetchResponse<SearchDspContractResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }

    const response = await apiFetch(
      `/dsp-contracts?${queryParams.toString()}`,
      {
        method: "GET",
      },
    );
    return response as FetchResponse<SearchDspContractResponse>;
  } catch (error) {
    console.error("[searchDspContract] error", error);
    throw error instanceof Error
      ? error
      : new Error("DSP 계약 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};

import { FetchResponse, apiFetch } from "../fetch";

import DspContract from "@/types/dsp-contract";

interface GetDspContractsResponse {
  dspContractList: DspContract[];
}

export const getDspContracts = async (): Promise<
  FetchResponse<GetDspContractsResponse>
> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__limit", "100");
    queryParams.append("__sortOption", "createdAtDESC");

    const response = await apiFetch(`/dsp-contracts?${queryParams.toString()}`);

    return response as FetchResponse<GetDspContractsResponse>;
  } catch (error) {
    console.error("[getDspContracts] error", error);

    throw error instanceof Error
      ? error
      : new Error("DSP 계약 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

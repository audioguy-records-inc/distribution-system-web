import { FetchResponse, apiFetch } from "../fetch";

import DspContract from "@/types/dsp-contract";

interface GetDspContractsResponse {
  dspContractList: DspContract[];
}

export const getDspContracts = async (): Promise<
  FetchResponse<GetDspContractsResponse>
> => {
  try {
    const response = await apiFetch("/dsp-contracts");

    return response as FetchResponse<GetDspContractsResponse>;
  } catch (error) {
    console.error("[getDspContracts] error", error);

    throw error instanceof Error
      ? error
      : new Error("DSP 계약 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

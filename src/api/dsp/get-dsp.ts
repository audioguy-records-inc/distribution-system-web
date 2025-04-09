import { FetchResponse, apiFetch } from "../fetch";

import { Dsp } from "@/types/dsp";

interface GetDspResponse {
  dspList: Dsp[];
}

export const getDsp = async (): Promise<FetchResponse<GetDspResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__limit", "100");
    queryParams.append("__sortOption", "createdAtDESC");

    const response = await apiFetch(`/dsps?${queryParams.toString()}`);

    return response as FetchResponse<GetDspResponse>;
  } catch (error) {
    console.error("[getDsp] error", error);

    throw error instanceof Error
      ? error
      : new Error("DSP 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

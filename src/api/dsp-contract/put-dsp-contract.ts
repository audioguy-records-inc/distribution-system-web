import { FetchResponse, apiFetch } from "../fetch";

import DspContract from "@/types/dsp-contract";

interface PutDspContractRequest {
  dspContract: DspContract;
}

interface PutDspContractResponse {
  dspContract: DspContract;
}

export const putDspContract = async (
  request: PutDspContractRequest,
): Promise<FetchResponse<PutDspContractResponse>> => {
  try {
    const response = await apiFetch(
      `/dsp-contracts/${request.dspContract._id}`,
      {
        method: "PUT",
        body: JSON.stringify(request.dspContract),
      },
    );

    return response as FetchResponse<PutDspContractResponse>;
  } catch (error) {
    console.error("[putDspContract] error", error);

    throw error instanceof Error
      ? error
      : new Error("DSP 계약 수정 중 알 수 없는 오류가 발생했습니다.");
  }
};

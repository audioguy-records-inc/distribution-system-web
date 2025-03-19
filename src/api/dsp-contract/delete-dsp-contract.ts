import { FetchResponse, apiFetch } from "../fetch";

interface DeleteDspContractResponse {
  message: string;
  error: boolean;
}

interface DeleteDspContractRequest {
  dspContractId: string;
}

export const deleteDspContract = async (
  request: DeleteDspContractRequest,
): Promise<FetchResponse<DeleteDspContractResponse>> => {
  try {
    const response = await apiFetch(`/dsp-contracts/${request.dspContractId}`, {
      method: "DELETE",
    });

    return response as FetchResponse<DeleteDspContractResponse>;
  } catch (error) {
    console.error("[deleteDspContract] error", error);

    throw error instanceof Error
      ? error
      : new Error("DSP 계약 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};

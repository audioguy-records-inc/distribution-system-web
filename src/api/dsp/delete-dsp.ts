import { apiFetch } from "../fetch";

interface DeleteDspRequest {
  dspId: string;
}

export const deleteDsp = async (request: DeleteDspRequest) => {
  try {
    const response = await apiFetch(`/dsps/${request.dspId}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    console.error("[deleteDsp] error", error);

    throw error instanceof Error
      ? error
      : new Error("DSP 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};

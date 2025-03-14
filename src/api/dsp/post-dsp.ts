import { FetchResponse, apiFetch } from "../fetch";

import { Dsp } from "@/types/dsp";

interface PostDspResponse {
  dspList: Dsp[];
}

export const postDsp = async (
  request: { name: string; imageOriginalPath: string }[],
): Promise<FetchResponse<PostDspResponse>> => {
  try {
    const response = await apiFetch("/dsps", {
      method: "POST",
      body: JSON.stringify(request),
    });

    return response as FetchResponse<PostDspResponse>;
  } catch (error) {
    console.error("[postDsp] error", error);

    throw error instanceof Error
      ? error
      : new Error("DSP 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};

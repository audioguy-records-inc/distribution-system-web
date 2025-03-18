import { FetchResponse, apiFetch } from "../fetch";

import DspContract from "@/types/dsp-contract";

// interface PostDspContractRequest {
//   dspContractName: string;
//   dspId: string;
//   dspContractUniqueId: string;
//   regionType: "international" | "domestic";
//   countryCode: string;
//   isContractEnabled: boolean;
//   isTimeReleaseEnabled: boolean;
//   contractRate: number;
//   contactPersonList: {
//     responsibility: "contract" | "settlement" | "promotion";
//     name: string;
//     email: string;
//     phone: string;
//   }[];
//   contractItemList: string[];
//   fileList: {
//     name: string;
//     filePath: string;
//   }[];
// }

interface PostDspContractRequest {
  dspContractList: DspContract[];
}

interface PostDspContractResponse {
  dspContractList: DspContract[];
}

export const postDspContract = async (
  request: PostDspContractRequest,
): Promise<FetchResponse<PostDspContractResponse>> => {
  try {
    const response = await apiFetch("/dsp-contracts", {
      method: "POST",
      body: JSON.stringify(request.dspContractList),
    });

    return response as FetchResponse<PostDspContractResponse>;
  } catch (error) {
    console.error("[postDspContract] error", error);

    throw error instanceof Error
      ? error
      : new Error("DSP 계약 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};

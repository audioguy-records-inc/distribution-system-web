import { Announcement, AnnouncementType } from "@/types/announcement";
import { FetchResponse, apiFetch } from "../fetch";

interface SearchAnnouncementRequest {
  type: AnnouncementType;
  __searchKeyword: string;
  __searchFields?: string;
  __skip?: number; // 기본값 0
  __limit?: number; // 기본값 10
  __sortOption?: string; // 기본값 '_idASC,createdAtIdDESC'
}

interface SearchAnnouncementResponse {
  announcementList: Announcement[];
}

export const searchAnnouncement = async (
  request: SearchAnnouncementRequest,
): Promise<FetchResponse<SearchAnnouncementResponse>> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("__searchKeyword", request.__searchKeyword);
    if (request.__searchFields) {
      queryParams.append("__searchFields", request.__searchFields);
    }
    if (request.__skip) {
      queryParams.append("__skip", request.__skip.toString());
    }
    if (request.__limit) {
      queryParams.append("__limit", request.__limit.toString());
    } else {
      queryParams.append("__limit", "100");
    }
    if (request.__sortOption) {
      queryParams.append("__sortOption", request.__sortOption);
    } else {
      queryParams.append("__sortOption", "createdAtDESC");
    }

    const response = await apiFetch(
      `/announcements?${queryParams.toString()}`,
      {
        method: "GET",
      },
    );
    return response as FetchResponse<SearchAnnouncementResponse>;
  } catch (error) {
    console.error("[searchAnnouncement] error", error);
    throw error instanceof Error
      ? error
      : new Error("공지사항 검색 중 알 수 없는 오류가 발생했습니다.");
  }
};

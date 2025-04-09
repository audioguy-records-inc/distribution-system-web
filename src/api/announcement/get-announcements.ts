import { FetchResponse, apiFetch } from "../fetch";

import { Announcement } from "@/types/announcement";

interface GetAnnouncementsRequest {
  __limit: number;
  __sortOption?: string;
}

interface GetAnnouncementsResponse {
  announcementList: Announcement[];
}

export const getAnnouncements = async (
  request: GetAnnouncementsRequest,
): Promise<FetchResponse<GetAnnouncementsResponse>> => {
  try {
    const queryParams = new URLSearchParams();
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

    const url = `/announcements?${queryParams.toString()}`;

    const response = await apiFetch(url, {
      method: "GET",
    });

    return response as FetchResponse<GetAnnouncementsResponse>;
  } catch (error) {
    console.error("[getAnnouncements] error", error);

    throw error instanceof Error
      ? error
      : new Error("공지사항 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

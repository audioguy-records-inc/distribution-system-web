import { FetchResponse, apiFetch } from "../fetch";

import { Announcement } from "@/types/announcement";

interface GetAnnouncementRequest {
  announcementId: string;
}

interface GetAnnouncementResponse {
  announcement: Announcement;
}

export const getAnnouncement = async (
  request: GetAnnouncementRequest,
): Promise<FetchResponse<GetAnnouncementResponse>> => {
  try {
    const response = await apiFetch(`/announcements/${request.announcementId}`);
    return response as FetchResponse<GetAnnouncementResponse>;
  } catch (error) {
    console.error("[getAnnouncement] error", error);
    throw error instanceof Error
      ? error
      : new Error("공지사항 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

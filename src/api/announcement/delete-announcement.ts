import { FetchResponse, apiFetch } from "../fetch";

import { Announcement } from "@/types/announcement";

interface DeleteAnnouncementRequest {
  announcementId: string;
}

interface DeleteAnnouncementResponse {
  announcement: Announcement;
}

export const deleteAnnouncement = async (
  request: DeleteAnnouncementRequest,
): Promise<FetchResponse<DeleteAnnouncementResponse>> => {
  try {
    const response = await apiFetch(`/announcements/${request.announcementId}`);

    return response as FetchResponse<DeleteAnnouncementResponse>;
  } catch (error) {
    console.error("[deleteAnnouncement] error", error);
    throw error instanceof Error
      ? error
      : new Error("공지사항 삭제 중 알 수 없는 오류가 발생했습니다.");
  }
};

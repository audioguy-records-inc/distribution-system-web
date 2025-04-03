import { FetchResponse, apiFetch } from "../fetch";

import { Announcement } from "@/types/announcement";

interface PutAnnouncementRequest {
  announcement: Announcement;
}

interface PutAnnouncementResponse {
  announcement: Announcement;
}

export const putAnnouncement = async (
  request: PutAnnouncementRequest,
): Promise<FetchResponse<PutAnnouncementResponse>> => {
  try {
    const response = await apiFetch(
      `/announcements/${request.announcement._id}`,
      {
        method: "PUT",
        body: JSON.stringify(request.announcement),
      },
    );
    return response as FetchResponse<PutAnnouncementResponse>;
  } catch (error) {
    console.error("[putAnnouncement] error", error);
    throw error instanceof Error
      ? error
      : new Error("공지사항 수정 중 알 수 없는 오류가 발생했습니다.");
  }
};

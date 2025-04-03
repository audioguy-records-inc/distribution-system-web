import { FetchResponse, apiFetch } from "../fetch";

import { Announcement } from "@/types/announcement";

interface PostAnnouncementRequest {
  announcementList: Announcement[];
}

interface PostAnnouncementResponse {
  announcementList: Announcement[];
}

export const postAnnouncement = async (
  request: PostAnnouncementRequest,
): Promise<FetchResponse<PostAnnouncementResponse>> => {
  try {
    const response = await apiFetch("/announcements", {
      method: "POST",
      body: JSON.stringify(request.announcementList),
    });
    return response as FetchResponse<PostAnnouncementResponse>;
  } catch (error) {
    console.error("[postAnnouncement] error", error);
    throw error instanceof Error
      ? error
      : new Error("공지사항 생성 중 알 수 없는 오류가 발생했습니다.");
  }
};

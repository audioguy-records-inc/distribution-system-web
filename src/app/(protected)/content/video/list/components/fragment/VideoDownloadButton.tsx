import * as XLSX from "xlsx";

import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DownloadIcon from "@/components/icons/DownloadIcon";
import DownloadModal from "@/components/DownloadModal";
import Video from "@/types/video";
import { getFullUrl } from "@/constants/api";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useState } from "react";
import { useVideoStore } from "@/stores/use-video-store";

const Container = styled.div``;

export default function VideoDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { videos } = useVideoStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 앨범 데이터를 다운로드 가능한 형식으로 변환
  const prepareDataForExport = async (videos: Video[]) => {
    return videos.map((video) => ({
      앨범명: JSON.stringify(video.titleList),
      아티스트: video.releaseArtistList?.map((artist) => artist.name).join(","),
      트랙매칭: video.isMathcedTrack ? "해당" : "해당없음",
      앨범유형: video.videoType || "",
      유무료: video.isFree ? "무료" : "유료",
      발매국가: video.releaseCountryCode || "",
      기획사: video.agencyCompanyName || "",
      발매사: video.userInfo?.displayName || "",
      계약정보: video.userContract?.userContractName || "",
      공급지역: video.supplyRegion || "",
      공급제외지역: video.excludedRegionList?.join(",") || "",
      영상코드: video.videoUniqueId,
      UPC: video.UPC,
      ISRC: video.ISRC,
      발매일: video.utcReleasedAt
        ? new Date(video.utcReleasedAt).toLocaleDateString()
        : "",
      서비스시간: video.utcServiceStartedAt
        ? new Date(video.utcServiceStartedAt).toLocaleDateString()
        : "",
      심의처: video.ratingAuthority || "",
      심의제외사유: video.ratingExemptionReason || "",
      심의등급: video.rating || "",
      심의일자: video.utcRatedAt
        ? new Date(video.utcRatedAt).toLocaleDateString()
        : "",
      심의파일: video.ratingFileList
        ?.map((file) => getFullUrl(file.filePath))
        .join(","),
      요청사항: video.requestDetails || "",
      뮤직비디오: video.videoFileList
        ?.map((file) => getFullUrl(file.filePath))
        .join(","),
      썸네일: video.thumbnailImageList
        ?.map((image) => getFullUrl(image.imageOriginalPath))
        .join(","),
    }));
  };

  const handleExcelDownload = async () => {
    const data = await prepareDataForExport(videos);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "앨범");

    // 엑셀 파일 생성 및 다운로드
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const res = await saveAs(
      blob,
      `앨범_목록_${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setIsModalOpen(false);
  };

  const handleCsvDownload = async () => {
    const data = await prepareDataForExport(videos);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `영상_목록_${new Date().toISOString().split("T")[0]}.csv`);

    setIsModalOpen(false);
  };

  return (
    <Container>
      <ButtonOutlinedPrimary
        label="다운로드"
        leftIcon={<DownloadIcon />}
        onClick={handleOpenModal}
        size="medium"
      />
      <DownloadModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onClickExcel={handleExcelDownload}
        onClickCsv={handleCsvDownload}
      />
    </Container>
  );
}

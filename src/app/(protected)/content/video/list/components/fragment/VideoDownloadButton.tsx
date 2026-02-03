import * as XLSX from "xlsx";

import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DownloadIcon from "@/components/icons/DownloadIcon";
import DownloadModal from "@/components/DownloadModal";
import Video from "@/types/video";
import { getFullUrl } from "@/constants/api";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useVideoStore } from "@/stores/use-video-store";

const Container = styled.div``;

export default function VideoDownloadButton() {
  const tc = useTranslations("common");
  const tv = useTranslations("video");
  const tt = useTranslations("track");
  const tco = useTranslations("content");
  const tcon = useTranslations("contract");
  const tl = useTranslations("licensor");
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
      [tv("videoName")]: JSON.stringify(video.titleList),
      [tv("videoArtist")]: video.releaseArtistList?.map((artist) => artist.name).join(","),
      [tt("trackMatching")]: video.isMathcedTrack ? tt("applicable") : tt("notApplicable"),
      [tv("videoType")]: video.videoType || "",
      [tv("paidFree")]: video.isFree ? tv("free") : tv("paid"),
      [tv("releaseCountry")]: video.releaseCountryCode || "",
      [tco("label")]: video.agencyCompanyName || "",
      [tv("publisher")]: video.userInfo?.displayName || "",
      [tcon("contractInfo")]: video.userContractInfo?.userContractName || "",
      [tv("supplyRegion")]: video.supplyRegion || "",
      [tv("excludeRegion")]: video.excludedRegionList?.join(",") || "",
      [tv("videoCode")]: video.videoUniqueId,
      UPC: video.UPC,
      ISRC: video.ISRC,
      [tco("releaseDate")]: video.utcReleasedAt
        ? new Date(video.utcReleasedAt).toLocaleDateString()
        : "",
      [tco("serviceTime")]: video.utcServiceStartedAt
        ? new Date(video.utcServiceStartedAt).toLocaleDateString()
        : "",
      [tv("censorOrg")]: video.ratingAuthority || "",
      [tv("censorExemptReason")]: video.ratingExemptionReason || "",
      [tv("censorRating")]: video.rating || "",
      [tv("censorDate")]: video.utcRatedAt
        ? new Date(video.utcRatedAt).toLocaleDateString()
        : "",
      [tv("censorFile")]: video.ratingFileList
        ?.map((file) => getFullUrl(file.filePath))
        .join(","),
      [tv("requestNote")]: video.requestDetails || "",
      [tv("musicVideo")]: video.videoFileList
        ?.map((file) => getFullUrl(file.filePath))
        .join(","),
      [tv("thumbnailImage")]: video.thumbnailImageList
        ?.map((image) => getFullUrl(image.imageOriginalPath))
        .join(","),
    }));
  };

  const handleExcelDownload = async () => {
    const data = await prepareDataForExport(videos);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, tv("videoList"));

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
      `${tv("videoList")}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setIsModalOpen(false);
  };

  const handleCsvDownload = async () => {
    const data = await prepareDataForExport(videos);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${tv("videoList")}_${new Date().toISOString().split("T")[0]}.csv`);

    setIsModalOpen(false);
  };

  return (
    <Container>
      <ButtonOutlinedPrimary
        label={tc("download")}
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

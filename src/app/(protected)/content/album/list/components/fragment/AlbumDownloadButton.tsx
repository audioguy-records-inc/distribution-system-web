import * as XLSX from "xlsx";

import Album, { TitleLanguage } from "@/types/album";

import { Artist } from "@/types/artist";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DownloadIcon from "@/components/icons/DownloadIcon";
import DownloadModal from "@/components/DownloadModal";
import { getFullUrl } from "@/constants/api";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useAlbumStore } from "@/stores/use-album-store";
import { useArtistStore } from "@/stores/use-artist-store";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useUserContractStore } from "@/stores/use-user-contract-store";

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

export default function AlbumDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullDownloadModalOpen, setIsFullDownloadModalOpen] = useState(false);
  const { albums, fetchAllAlbums } = useAlbumStore();
  const tc = useTranslations("common");
  const t = useTranslations("content");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenFullDownloadModal = () => {
    setIsFullDownloadModalOpen(true);
  };

  const handleCloseFullDownloadModal = () => {
    setIsFullDownloadModalOpen(false);
  };

  // 앨범 데이터를 다운로드 가능한 형식으로 변환 (트랙별로 행 분리)
  const prepareDataForExport = async (albums: Album[]) => {
    console.log(albums);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const trackRows: any[] = [];

    albums.forEach((album) => {
      // titleList에서 국문과 영문 제목 추출
      const koreanTitle = album.titleList?.find((title) => title.ko)?.ko || "";
      const englishTitle = album.titleList?.find((title) => title.en)?.en || "";

      // 앨범 기본 정보
      const albumBaseData = {
        UCI: album.UCI,
        UPC: album.UPC,
        [t("excelArtistImage")]: album.artistImageList
          ?.map((artist) => artist.imageOriginalPath)
          .join(","),
        [t("excelAlbumNameKo")]: koreanTitle,
        [t("excelAlbumNameEn")]: englishTitle,
        [t("excelArtist")]: album.releaseArtistList
          ?.map((artist) => artist.name)
          .join(","),
        [t("excelParticipateArtist")]: album.participateArtistList
          ?.map((artist) => artist.name)
          .join(","),
        [t("excelAlbumType")]: album.albumType || "",
        [t("excelMainGenre")]: album.mainGenre || "",
        [t("excelSubGenre")]: album.subGenre || "",
        [t("excelReleaseCountry")]: album.releaseCountryCode || "",
        [t("excelNumberOfDiscs")]: album.numberOfDiscs || "",
        [t("excelTracksPerDisc")]: album.numberOfTracksPerDisc || "",
        [t("excelDistributor")]: album.distributionCompanyName || "",
        [t("excelAgency")]: album.agencyCompanyName || "",
        [t("excelLicensor")]: album.userInfo?.displayName || "",
        [t("excelReleaseDate")]: album.utcReleasedAt
          ? new Date(album.utcReleasedAt).toLocaleDateString()
          : "",
        [t("excelServiceTime")]: album.utcServiceStartedAt
          ? new Date(album.utcServiceStartedAt).toLocaleDateString()
          : "",
        [t("excelExposure")]: album.isExposed ? t("excelExposed") : t("excelNotExposed"),
        [t("excelAdult")]: album.isAdultOnly ? t("excelAdultOnly") : t("excelGeneral"),
        [t("excelIntroduction")]: album.albumIntroduction || "",
        [t("excelRequestDetails")]: album.requestDetails || "",
        [t("excelCoverImage")]: album.coverImageList
          ?.map((image) => getFullUrl(image.imageOriginalPath))
          .join(","),
        [t("excelBookletImage")]: album.bookletImageList
          ?.map((image) => getFullUrl(image.imageOriginalPath))
          .join(","),
        [t("excelEtcFile")]: album.etcFileList
          ?.map((file) => getFullUrl(file.filePath))
          .join(","),
      };

      // 트랙이 있는 경우 각 트랙별로 행 생성
      if (album.trackList && album.trackList.length > 0) {
        album.trackList.forEach((track) => {
          let koreanTrackTitle = "";
          let englishTrackTitle = "";

          // track이 titleList를 가지고 있는 경우 (실제 Track 타입)
          if ("titleList" in track && track.titleList) {
            koreanTrackTitle =
              (track.titleList as TitleLanguage[]).find((title) => title.ko)
                ?.ko || "";
            englishTrackTitle =
              (track.titleList as TitleLanguage[]).find((title) => title.en)
                ?.en || "";
          } else {
            // track이 title을 가지고 있는 경우 (Album의 Track 타입)
            koreanTrackTitle = track.title || "";
            englishTrackTitle = track.title || "";
          }

          trackRows.push({
            ...albumBaseData,
            [t("excelTrackNameKo")]: koreanTrackTitle,
            [t("excelTrackNameEn")]: englishTrackTitle,
          });
        });
      } else {
        // 트랙이 없는 경우 앨범 정보만으로 행 생성
        trackRows.push({
          ...albumBaseData,
          [t("excelTrackNameKo")]: "",
          [t("excelTrackNameEn")]: "",
        });
      }
    });

    return trackRows;
  };

  const handleExcelDownload = async () => {
    const data = await prepareDataForExport(albums);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t("excelSheetAlbum"));

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
      `${t("excelFileAlbumList")}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setIsModalOpen(false);
  };

  const handleCsvDownload = async () => {
    const data = await prepareDataForExport(albums);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${t("excelFileAlbumList")}_${new Date().toISOString().split("T")[0]}.csv`);

    setIsModalOpen(false);
  };

  const handleFullExcelDownload = async () => {
    try {
      const allAlbums = await fetchAllAlbums();
      const data = await prepareDataForExport(allAlbums);
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, t("excelSheetAllAlbums"));

      // 엑셀 파일 생성 및 다운로드
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      await saveAs(
        blob,
        `${t("excelFileAllAlbumList")}_${new Date().toISOString().split("T")[0]}.xlsx`,
      );

      setIsFullDownloadModalOpen(false);
    } catch (error) {
      console.error("Full album download failed:", error);
    }
  };

  const handleFullCsvDownload = async () => {
    try {
      const allAlbums = await fetchAllAlbums();
      const data = await prepareDataForExport(allAlbums);
      const worksheet = XLSX.utils.json_to_sheet(data);
      const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

      // CSV 파일 생성 및 다운로드
      const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
      saveAs(
        blob,
        `${t("excelFileAllAlbumList")}_${new Date().toISOString().split("T")[0]}.csv`,
      );

      setIsFullDownloadModalOpen(false);
    } catch (error) {
      console.error("Full album download failed:", error);
    }
  };

  return (
    <Container>
      <ButtonOutlinedPrimary
        label={tc("download")}
        leftIcon={<DownloadIcon />}
        onClick={handleOpenModal}
        size="medium"
      />
      <ButtonOutlinedPrimary
        label={t("downloadAllAlbums")}
        leftIcon={<DownloadIcon />}
        onClick={handleOpenFullDownloadModal}
        size="medium"
      />
      <DownloadModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onClickExcel={handleExcelDownload}
        onClickCsv={handleCsvDownload}
      />
      <DownloadModal
        isOpen={isFullDownloadModalOpen}
        onRequestClose={handleCloseFullDownloadModal}
        onClickExcel={handleFullExcelDownload}
        onClickCsv={handleFullCsvDownload}
      />
    </Container>
  );
}

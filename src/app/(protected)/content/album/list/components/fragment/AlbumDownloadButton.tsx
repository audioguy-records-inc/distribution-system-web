import * as XLSX from "xlsx";

import Album from "@/types/album";
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
import { useUserContractStore } from "@/stores/use-user-contract-store";

const Container = styled.div``;

export default function AlbumDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { albums } = useAlbumStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 앨범 데이터를 다운로드 가능한 형식으로 변환
  const prepareDataForExport = async (albums: Album[]) => {
    return albums.map((album) => ({
      UCI: album.UCI,
      UPC: album.UPC,
      앨범코드: album.albumUniqueId,
      아티스트이미지: album.artistImageList
        ?.map((artist) => artist.imageOriginalPath)
        .join(","),
      앨범명: JSON.stringify(album.titleList),
      아티스트: album.releaseArtistList?.map((artist) => artist.name).join(","),
      참여아티스트: album.participateArtistList
        ?.map((artist) => artist.name)
        .join(","),
      앨범타이틀: JSON.stringify(album.titleList),
      앨범유형: album.albumType || "",
      메인장르: album.mainGenre || "",
      서브장르: album.subGenre || "",
      발매국가: album.releaseCountryCode || "",
      디스크수: album.numberOfDiscs || "",
      CD별수록곡: album.numberOfTracksPerDisc || "",
      유통사: album.distributionCompanyName || "",
      기획사: album.agencyCompanyName || "",
      권리사: album.userInfo?.displayName || "",
      발매일: album.utcReleasedAt
        ? new Date(album.utcReleasedAt).toLocaleDateString()
        : "",
      서비스시간: album.utcServiceStartedAt
        ? new Date(album.utcServiceStartedAt).toLocaleDateString()
        : "",
      노출: album.isExposed ? "노출" : "미노출",
      성인: album.isAdultOnly ? "성인" : "일반",
      공간음향서비스: album.isSupportedSpatialAudio ? "지원" : "미지원",
      소개: album.albumIntroduction || "",
      요청사항: album.requestDetails || "",
      커버이미지: album.coverImageList
        ?.map((image) => getFullUrl(image.imageOriginalPath))
        .join(","),
      부클릿이미지: album.bookletImageList
        ?.map((image) => getFullUrl(image.imageOriginalPath))
        .join(","),
      기타파일: album.etcFileList
        ?.map((file) => getFullUrl(file.filePath))
        .join(","),
      트랙정보: album.trackList?.map((track) => track.title).join(","),
    }));
  };

  const handleExcelDownload = async () => {
    const data = await prepareDataForExport(albums);
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
    const data = await prepareDataForExport(albums);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `앨범_목록_${new Date().toISOString().split("T")[0]}.csv`);

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

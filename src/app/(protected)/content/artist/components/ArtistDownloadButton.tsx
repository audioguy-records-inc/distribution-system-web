import * as XLSX from "xlsx";

import { Artist } from "@/types/artist";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DownloadIcon from "@/components/icons/DownloadIcon";
import DownloadModal from "@/components/DownloadModal";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useArtistStore } from "@/stores/use-artist-store";
import { useState } from "react";

const Container = styled.div``;

export default function ArtistDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { artists } = useArtistStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 아티스트 데이터를 다운로드 가능한 형식으로 변환
  const prepareDataForExport = (artists: Artist[]) => {
    return artists.map((artist) => ({
      아티스트명: artist.name,
      고유ID: artist.artistUniqueId,
      국가코드: artist.countryCode,
      국가유형: artist.countryType || "",
      성별유형: artist.genderType,
      아티스트유형: artist.artistType,
      SNS링크: artist.snsLinkList
        .map((sns) => `${sns.site}: ${sns.link}`)
        .join(", "),
    }));
  };

  const handleExcelDownload = async () => {
    const data = prepareDataForExport(artists);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "아티스트");

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
      `아티스트_목록_${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setIsModalOpen(false);
  };

  const handleCsvDownload = () => {
    const data = prepareDataForExport(artists);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `아티스트_목록_${new Date().toISOString().split("T")[0]}.csv`);

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

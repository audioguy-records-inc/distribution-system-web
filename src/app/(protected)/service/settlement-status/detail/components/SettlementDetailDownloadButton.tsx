import * as XLSX from "xlsx";

import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DownloadIcon from "@/components/icons/DownloadIcon";
import DownloadModal from "@/components/DownloadModal";
import { SettlementDetail } from "@/types/settlement-matched-record";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useState } from "react";

const Container = styled.div``;

export default function SettlementDetailDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { settlementDetails } = useSettlementStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 정산 상세 데이터를 다운로드 가능한 형식으로 변환
  const prepareSettlementDetailData = () => {
    if (!settlementDetails || settlementDetails.length === 0) return null;

    const detailData = settlementDetails.map((detail) => ({
      정산월: detail.settlementMonth,
      판매월: detail.salesMonth,
      서비스채널: detail.service,
      UPC: detail.UPC,
      ISRC: detail.ISRC,
      앨범명: detail.albumTitle,
      트랙명: detail.trackTitle,
      발매일: detail.utcReleasedAt,
      기획사: detail.agencyCompanyName,
      권리자명: detail.userDisplayName,
      권리자계정: detail.userAccount,
      앨범유통코드: detail.albumDistributionCode,
      정산금: detail.userSettlementFee,
      아티스트: detail.artistNameList.join(", "),
    }));

    return detailData;
  };

  const handleExcelDownload = async () => {
    const settlementDetailData = prepareSettlementDetailData();

    const workbook = XLSX.utils.book_new();

    // 정산 상세 데이터 시트 추가
    if (settlementDetailData) {
      const detailWorksheet = XLSX.utils.json_to_sheet(settlementDetailData);
      XLSX.utils.book_append_sheet(workbook, detailWorksheet, "정산상세내역");
    }

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
      `정산상세내역_${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setIsModalOpen(false);
  };

  const handleCsvDownload = async () => {
    const settlementDetailData = prepareSettlementDetailData();

    if (!settlementDetailData) {
      setIsModalOpen(false);
      return;
    }

    // 정산 상세 데이터를 CSV로 변환
    const worksheet = XLSX.utils.json_to_sheet(settlementDetailData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `정산상세내역_${new Date().toISOString().split("T")[0]}.csv`);

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

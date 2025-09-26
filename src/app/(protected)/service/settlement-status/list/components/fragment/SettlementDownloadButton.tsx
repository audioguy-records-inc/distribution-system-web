import * as XLSX from "xlsx";

import { AuthLevel } from "@/types/user";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DownloadIcon from "@/components/icons/DownloadIcon";
import DownloadModal from "@/components/DownloadModal";
import { SettlementSummary } from "@/types/settlement-summary";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useState } from "react";

const Container = styled.div``;

export default function SettlementDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { settlementSummaries } = useSettlementStore();
  const { user } = useAuthStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 정산 요약 데이터를 다운로드 가능한 형식으로 변환
  const prepareDataForExport = async (summaries: SettlementSummary[]) => {
    const isAdmin = user?.authLevel === AuthLevel.ADMIN;

    return summaries.map((summary) => {
      const baseData = {
        권리자명: summary.userDisplayName,
        권리자코드: summary.userAccount,
        정산시작월: summary.settlementStartMonth,
        정산종료월: summary.settlementEndMonth,
        서비스매출: summary.settlementFee,
        정산금: summary.userSettlementFee,
      };

      // 관리자인 경우에만 유통수수료 포함
      if (isAdmin) {
        return {
          ...baseData,
          유통수수료: summary.distributionFee,
        };
      }

      return baseData;
    });
  };

  const handleExcelDownload = async () => {
    const data = await prepareDataForExport(settlementSummaries);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "정산금");

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
      `정산금_${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setIsModalOpen(false);
  };

  const handleCsvDownload = async () => {
    const data = await prepareDataForExport(settlementSummaries);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `정산금_${new Date().toISOString().split("T")[0]}.csv`);

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

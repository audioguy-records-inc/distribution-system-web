import * as XLSX from "xlsx";

import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import DownloadIcon from "@/components/icons/DownloadIcon";
import DownloadModal from "@/components/DownloadModal";
import { SettlementAdminInvoice } from "@/types/settlement-matched-record";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Container = styled.div``;

export default function SettlementAdminInvoiceDownloadButton() {
  const t = useTranslations("settlement");
  const tCommon = useTranslations("common");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { settlementAdminInvoices } = useSettlementStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 앨범 데이터를 다운로드 가능한 형식으로 변환
  const prepareDataForExport = async (
    settlementAdminInvoices: SettlementAdminInvoice[],
  ) => {
    return settlementAdminInvoices.map((settlementAdminInvoice) => ({
      [t("settlementMonth")]: settlementAdminInvoice.settlementMonth,
      [t("salesAmount")]: settlementAdminInvoice.totalSettlementFee,
      [t("distributionFeeRevenue")]: settlementAdminInvoice.totalDistributionFee,
      [t("licensorSettlementAmount")]: settlementAdminInvoice.totalUserSettlementFee,
    }));
  };

  const handleExcelDownload = async () => {
    const data = await prepareDataForExport(settlementAdminInvoices);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t("settlementAmount"));

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
      `${t("settlementAmount")}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setIsModalOpen(false);
  };

  const handleCsvDownload = async () => {
    const data = await prepareDataForExport(settlementAdminInvoices);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${t("distributionSettlement")}_${new Date().toISOString().split("T")[0]}.csv`);

    setIsModalOpen(false);
  };

  return (
    <Container>
      <ButtonOutlinedPrimary
        label={tCommon("download")}
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

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

export default function SettlementTaxInvoiceDownloadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { settlementTaxInvoices } = useSettlementStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 세금계산서 데이터를 다운로드 가능한 형식으로 변환
  const prepareTaxInvoiceData = () => {
    if (!settlementTaxInvoices || settlementTaxInvoices.length === 0)
      return null;

    const domesticData = settlementTaxInvoices.map((invoice) => ({
      정산월: invoice.settlementMonth,
      공급가액: invoice.domestic.netAmount,
      세액: invoice.domestic.taxAmount,
      발행총액: invoice.domestic.totalAmount,
    }));

    const internationalData = settlementTaxInvoices.map((invoice) => ({
      정산월: invoice.settlementMonth,
      공급가액: invoice.international.netAmount,
      세액: invoice.international.taxAmount,
      발행총액: invoice.international.totalAmount,
    }));

    const worldwideData = settlementTaxInvoices.map((invoice) => ({
      정산월: invoice.settlementMonth,
      공급가액: invoice.worldwide.netAmount,
      세액: invoice.worldwide.taxAmount,
      발행총액: invoice.worldwide.totalAmount,
    }));

    return {
      domesticData,
      internationalData,
      worldwideData,
    };
  };

  const handleExcelDownload = async () => {
    const taxInvoiceData = prepareTaxInvoiceData();

    const workbook = XLSX.utils.book_new();

    // 세금계산서 데이터 시트 추가 (3개 탭)
    if (taxInvoiceData) {
      const domesticWorksheet = XLSX.utils.json_to_sheet(
        taxInvoiceData.domesticData,
      );
      XLSX.utils.book_append_sheet(workbook, domesticWorksheet, "국내");

      const internationalWorksheet = XLSX.utils.json_to_sheet(
        taxInvoiceData.internationalData,
      );
      XLSX.utils.book_append_sheet(workbook, internationalWorksheet, "해외");

      const worldwideWorksheet = XLSX.utils.json_to_sheet(
        taxInvoiceData.worldwideData,
      );
      XLSX.utils.book_append_sheet(workbook, worldwideWorksheet, "전체");
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
      `세금계산서_${new Date().toISOString().split("T")[0]}.xlsx`,
    );

    setIsModalOpen(false);
  };

  const handleCsvDownload = async () => {
    const taxInvoiceData = prepareTaxInvoiceData();

    if (!taxInvoiceData) {
      setIsModalOpen(false);
      return;
    }

    // 전체 데이터를 CSV로 변환
    const worksheet = XLSX.utils.json_to_sheet(taxInvoiceData.worldwideData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

    // CSV 파일 생성 및 다운로드
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(
      blob,
      `세금계산서_상세내역_${new Date().toISOString().split("T")[0]}.csv`,
    );

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

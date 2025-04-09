import {
  GetSettlementTaxInvoicesRequest,
  RegionType,
} from "@/api/settlement/get-settlement-tax-invoices";
import SettlementTaxInvoiceSearchTypeDropdown, {
  SettlementTaxInvoiceSearchType,
} from "./fragment/SettlementTaxInvoiceSearchType";

import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import CustomMonthCalendar from "@/components/basic/CustomMonthCalendar";
import Gap from "@/components/basic/Gap";
import SettlementTaxInvoiceDateTypeDropdown from "./fragment/SettlementTaxInvoiceDateType";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useState } from "react";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const DateLabel = styled.div`
  ${theme.fonts.body1.medium};
  color: ${theme.colors.gray[600]};
`;

const DateDash = styled.div`
  height: 1.5px;
  width: 16px;
  background-color: ${theme.colors.gray[500]};
  border-radius: 10px;
`;

export default function SettlementTaxInvoiceSearch() {
  const [dateType, setDateType] = useState<"settlement" | "sales">(
    "settlement",
  );
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedType, setSelectedType] =
    useState<SettlementTaxInvoiceSearchType>("all");
  const [isLoading, setIsLoading] = useState(false);

  const { fetchSettlementTaxInvoices } = useSettlementStore();

  const handleSearch = async () => {
    setIsLoading(true);
    if (!startDate || !endDate) {
      toast.error("기간을 선택해주세요.");
      setIsLoading(false);
      return;
    }

    const __params: GetSettlementTaxInvoicesRequest = {};

    if (dateType === "settlement") {
      __params.__kstSettlementStartMonth = startDate;
      __params.__kstSettlementEndMonth = endDate;
    } else {
      __params.__kstSalesStartMonth = startDate;
      __params.__kstSalesEndMonth = endDate;
    }

    if (selectedType !== "all") {
      __params.regionType = selectedType as RegionType;
    }

    __params.__limit = 100;

    await fetchSettlementTaxInvoices(__params);
    setIsLoading(false);
  };

  return (
    <Container>
      <DateLabel>기간 검색</DateLabel>
      <Gap height={8} />
      <RowWrapper>
        <SettlementTaxInvoiceDateTypeDropdown
          selectedType={dateType}
          setSelectedType={setDateType}
        />
        <CustomMonthCalendar
          value={startDate}
          onChange={(date) => setStartDate(date)}
          size="normal"
        />
        <DateDash />
        <CustomMonthCalendar
          value={endDate}
          onChange={(date) => setEndDate(date)}
          size="normal"
        />
      </RowWrapper>
      <Gap height={12} />
      <DateLabel>공급 범위</DateLabel>
      <Gap height={8} />
      <RowWrapper>
        <SettlementTaxInvoiceSearchTypeDropdown
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <ButtonFilledPrimary
          label={isLoading ? "검색중..." : "검색"}
          onClick={handleSearch}
          disabled={isLoading}
        />
      </RowWrapper>
    </Container>
  );
}

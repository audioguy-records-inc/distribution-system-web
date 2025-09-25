import { useEffect, useState } from "react";

import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import CustomMonthCalendar from "@/components/basic/CustomMonthCalendar";
import Gap from "@/components/basic/Gap";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useSettlementStore } from "@/stores/use-settlement-store";

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

export default function SettlementAdminInvoiceSearch() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { settlementAdminInvoices, fetchSettlementAdminInvoices, reset } =
    useSettlementStore();

  // 컴포넌트 마운트 시 검색 폼 초기화
  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
    reset(); // store 데이터도 초기화
  }, [reset]);

  const handleSearch = async () => {
    setIsLoading(true);

    if (!startDate || !endDate) {
      toast.error("기간을 선택해주세요.");
      setIsLoading(false);
      return;
    }

    await fetchSettlementAdminInvoices({
      __kstSettlementStartMonth: startDate,
      __kstSettlementEndMonth: endDate,
      __limit: 100,
      // __sortOption: "createdAtDESC",
    });
    setIsLoading(false);
  };

  return (
    <Container>
      <DateLabel>기간 검색</DateLabel>
      <Gap height={8} />
      <RowWrapper>
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
        <ButtonFilledPrimary
          label={isLoading ? "검색중..." : "검색"}
          onClick={handleSearch}
          disabled={isLoading}
        />
      </RowWrapper>
    </Container>
  );
}

import SettlementSearchTypeDropdown, {
  SettlementSearchType,
} from "./fragment/SettlementSearchType";

import CustomMonthCalendar from "@/components/basic/CustomMonthCalendar";
import Gap from "@/components/basic/Gap";
import SearchInput from "@/components/SearchInput";
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

export default function SettlementSearch() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<SettlementSearchType>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchSettlementSummaries } = useSettlementStore();

  const handleSearch = async () => {
    setIsLoading(true);
    const __searchFields = selectedType === "all" ? "" : selectedType;
    const __searchKeyword = searchValue;

    if (!startDate || !endDate) {
      toast.error("기간을 선택해주세요.");
      setIsLoading(false);
      return;
    }

    await fetchSettlementSummaries({
      __searchFields,
      __searchKeyword,
      __kstSettlementStartMonth: startDate,
      __kstSettlementEndMonth: endDate,
      __skip: 0,
      __limit: 100,
      __sortOption: "settlementMonthASC",
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
      </RowWrapper>
      <Gap height={12} />
      <RowWrapper>
        <SettlementSearchTypeDropdown
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <SearchInput
          placeholder="앨범명, 트랙명, 아티스트명 입력"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClickSearch={handleSearch}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          isLoading={isLoading}
        />
      </RowWrapper>
    </Container>
  );
}

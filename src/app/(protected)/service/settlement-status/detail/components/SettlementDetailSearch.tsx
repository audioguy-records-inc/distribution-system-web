import SettlementDetailSearchTypeDropdown, {
  SettlementDetailSearchType,
} from "./fragment/SettlementDetailSearchType";

import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import CustomMonthCalendar from "@/components/basic/CustomMonthCalendar";
import Gap from "@/components/basic/Gap";
import { GetSettlementDetailsRequest } from "@/api/settlement/get-settlement-details";
import SearchInput from "@/components/SearchInput";
import SettlementDetailDateTypeDropdown from "./fragment/SettlementDetailDateType";
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

export default function SettlementDetailSearch() {
  const [dateType, setDateType] = useState<"settlement" | "sales">(
    "settlement",
  );
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedType, setSelectedType] =
    useState<SettlementDetailSearchType>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { fetchSettlementDetails } = useSettlementStore();

  const handleSearch = async () => {
    setIsLoading(true);
    if (!startDate || !endDate) {
      toast.error("기간을 선택해주세요.");
      setIsLoading(false);
      return;
    }

    // 전체검색 시 특정 필드들로 한정
    const getAllSearchFields = () => {
      return [
        "albumTitle", // 앨범명
        "trackTitle", // 트랙명
        "serviceName", // 서비스명
        "artistList.name", // 아티스트명
        "agencyCompanyName", // 기획사
        "userInfo.displayName", // 권리사명
      ].join(",");
    };

    const __params: GetSettlementDetailsRequest = {};

    if (dateType === "settlement") {
      __params.__kstSettlementStartMonth = startDate;
      __params.__kstSettlementEndMonth = endDate;
    } else {
      __params.__kstSalesStartMonth = startDate;
      __params.__kstSalesEndMonth = endDate;
    }

    const __searchFields =
      selectedType === "all" ? getAllSearchFields() : selectedType;
    __params.__searchFields = __searchFields;

    if (searchValue.trim()) {
      __params.__searchKeyword = searchValue.trim();
    }

    __params.__limit = 100;

    await fetchSettlementDetails(__params);
    setIsLoading(false);
  };

  return (
    <Container>
      <DateLabel>기간 검색</DateLabel>
      <Gap height={8} />
      <RowWrapper>
        <SettlementDetailDateTypeDropdown
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
      <DateLabel>검색 조건</DateLabel>
      <Gap height={8} />
      <RowWrapper>
        <SettlementDetailSearchTypeDropdown
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
        <ButtonFilledPrimary
          label={isLoading ? "검색중..." : "검색"}
          onClick={handleSearch}
          disabled={isLoading}
        />
      </RowWrapper>
    </Container>
  );
}

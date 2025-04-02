import AlbumSearchTypeDropdown, {
  AlbumSearchType,
} from "./fragment/AlbumSearchType";

import CustomCalendar from "@/components/basic/CustomCalendar";
import Gap from "@/components/basic/Gap";
import SearchInput from "@/components/SearchInput";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useAlbumStore } from "@/stores/use-album-store";
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

export default function AlbumSearch() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<AlbumSearchType>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchAlbums } = useAlbumStore();

  const handleSearch = async () => {
    setIsLoading(true);
    const __searchFields = selectedType === "all" ? "" : selectedType;
    const __searchKeyword = searchValue;

    if (!startDate || !endDate) {
      toast.error("발매일을 선택해주세요.");
      setIsLoading(false);
      return;
    }

    const response = await searchAlbums({
      __searchKeyword,
      __kstStartDate: startDate,
      __kstEndDate: endDate,
      __searchFields: __searchFields,
      __limit: 20,
    });
    setIsLoading(false);
    console.log(response);
  };

  return (
    <Container>
      <DateLabel>발매일 검색</DateLabel>
      <Gap height={8} />
      <RowWrapper>
        <CustomCalendar
          size="normal"
          value={
            startDate && moment(startDate).isValid()
              ? moment(startDate).format("YYYYMMDD")
              : null
          }
          onChange={(date) => {
            if (date) {
              const m = moment(date, "YYYYMMDD");
              if (m.isValid()) {
                // 한국 시간(KST)으로 변환하여 YYYY-MM-DD 형식으로 저장
                const kstDate = m.format("YYYY-MM-DD");
                setStartDate(kstDate);
              } else {
                console.error("발매일 유효하지 않음:", date);
                setStartDate(null);
              }
            } else {
              setStartDate(null);
            }
          }}
        />
        <DateDash />
        <CustomCalendar
          size="normal"
          value={
            endDate && moment(endDate).isValid()
              ? moment(endDate).format("YYYYMMDD")
              : null
          }
          onChange={(date) => {
            if (date) {
              const m = moment(date, "YYYYMMDD");
              if (m.isValid()) {
                // 한국 시간(KST)으로 변환하여 YYYY-MM-DD 형식으로 저장
                const kstDate = m.format("YYYY-MM-DD");
                setEndDate(kstDate);
              } else {
                console.error("발매일 유효하지 않음:", date);
                setEndDate(null);
              }
            } else {
              setEndDate(null);
            }
          }}
        />
      </RowWrapper>
      <Gap height={12} />
      <RowWrapper>
        <AlbumSearchTypeDropdown
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <SearchInput
          placeholder="검색어 입력"
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

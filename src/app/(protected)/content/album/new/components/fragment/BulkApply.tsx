import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import Album from "@/types/album";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import CustomCheckbox from "@/components/basic/CustomCheckbox";
import Track from "@/types/track";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 36px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray[50]};
  width: fit-content;
`;

interface BulkApplyProps {
  albumWatch: UseFormWatch<Album>;
  // setValue: UseFormSetValue<{ trackList: Track[] }>;
  // watch: UseFormWatch<{ trackList: Track[] }>;
}

export default function BulkApply({
  albumWatch,
}: // setValue,
// watch,
BulkApplyProps) {
  const [albumGenre, setAlbumGenre] = useState<boolean>(false);
  const [serviceTime, setServiceTime] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<boolean>(false);
  const [expose, setExpose] = useState<boolean>(false);
  const [contractInfo, setContractInfo] = useState<boolean>(false);

  const handleApply = () => {};

  return (
    <Container>
      <ButtonWrapper>
        <CustomCheckbox
          label="앨범 장르"
          checked={albumGenre}
          onChange={() => setAlbumGenre(!albumGenre)}
        />
        <CustomCheckbox
          label="서비스 시간"
          checked={serviceTime}
          onChange={() => setServiceTime(!serviceTime)}
        />
        <CustomCheckbox
          label="발매 국가"
          checked={countryCode}
          onChange={() => setCountryCode(!countryCode)}
        />
        <CustomCheckbox
          label="노출"
          checked={expose}
          onChange={() => setExpose(!expose)}
        />
        <CustomCheckbox
          label="계약 정보"
          checked={contractInfo}
          onChange={() => setContractInfo(!contractInfo)}
        />
        <ButtonOutlinedPrimary
          label="일괄 적용"
          onClick={handleApply}
          size="small"
        />
      </ButtonWrapper>
    </Container>
  );
}

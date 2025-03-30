import { Control, Controller, UseFormWatch } from "react-hook-form";
import { countryList, getCountryKeyValueList } from "@/constants/country";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export default function TrackReleaseCountryCode({
  value,
  onChange,
  readOnly = false,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <Container>
      <CustomDropdown
        label={"발매 국가"}
        items={getCountryKeyValueList()}
        placeholder="국가 선택"
        selectedKey={value}
        onSelectKey={(selectedKey) => {
          onChange(selectedKey);
        }}
        size="small"
        width={320}
        readOnly={readOnly}
      />
    </Container>
  );
}

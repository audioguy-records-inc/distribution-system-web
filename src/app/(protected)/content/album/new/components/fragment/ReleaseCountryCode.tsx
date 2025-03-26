import { Control, Controller, UseFormWatch } from "react-hook-form";
import { countryList, getCountryKeyValueList } from "@/constants/country";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export default function ReleaseCountryCode({
  control,
  watch,
}: {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
}) {
  return (
    <Container>
      <Controller
        name="releaseCountryCode"
        control={control}
        render={({ field }) => {
          return (
            <CustomDropdown
              label={"발매 국가"}
              items={getCountryKeyValueList()}
              placeholder="국가 선택"
              selectedKey={field.value}
              onSelectKey={(selectedKey) => {
                field.onChange(selectedKey);
              }}
              size="small"
              width={320}
            />
          );
        }}
      />
    </Container>
  );
}

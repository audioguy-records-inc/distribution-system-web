import { Control, Controller, UseFormWatch } from "react-hook-form";
import { countryList, getCountryKeyValueList } from "@/constants/country";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";

const Container = styled.div``;

export default function ReleaseCountryCode({
  control,
  watch,
}: {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
}) {
  const tv = useTranslations("video");
  const locale = useLocale();
  return (
    <Container>
      <Controller
        name="releaseCountryCode"
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <CustomDropdown
              label={tv("releaseCountry")}
              items={getCountryKeyValueList(locale)}
              placeholder={tv("countrySelect")}
              selectedKey={field.value}
              onSelectKey={(selectedKey) => {
                field.onChange(selectedKey);
              }}
              size="small"
              width={320}
              required
            />
          );
        }}
      />
    </Container>
  );
}

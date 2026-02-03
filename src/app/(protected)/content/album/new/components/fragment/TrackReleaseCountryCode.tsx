import { Control, Controller, UseFormWatch } from "react-hook-form";
import { countryList, getCountryKeyValueList } from "@/constants/country";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";

const Container = styled.div``;

export default function TrackReleaseCountryCode({
  value,
  onChange,
  readOnly = false,
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  required?: boolean;
}) {
  const tv = useTranslations("video");
  const locale = useLocale();
  return (
    <Container>
      <CustomDropdown
        label={tv("releaseCountry")}
        items={getCountryKeyValueList(locale)}
        placeholder={tv("countrySelect")}
        selectedKey={value}
        onSelectKey={(selectedKey) => {
          onChange(selectedKey);
        }}
        size="small"
        width={320}
        readOnly={readOnly}
        required={required}
      />
    </Container>
  );
}

import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomDropdownSearch from "@/components/basic/CustomDropdownSearch";
import { getCountryKeyValueList } from "@/constants/country";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";

const Container = styled.div``;

export default function ExcludedRegionList({
  control,
  watch,
  register,
  setValue,
}: {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
  register: UseFormRegister<Album>;
  setValue: UseFormSetValue<Album>;
}) {
  const locale = useLocale();
  const itemList = getCountryKeyValueList(locale);
  const tv = useTranslations("video");

  return (
    <Container>
      <Controller
        name="excludedRegionList"
        control={control}
        render={({ field }) => (
          <CustomDropdownSearch
            label={tv("serviceExcludeRegion")}
            items={itemList}
            placeholder={tv("excludeRegionPlaceholder")}
            selectedKeys={field.value || []}
            size="small"
            width={320}
            multiple={true}
            onMultiSelectKeys={(selectedKeys) => {
              field.onChange(selectedKeys);
            }}
          />
        )}
      />
    </Container>
  );
}

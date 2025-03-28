import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import { getCountryKeyValueList } from "@/constants/country";
import styled from "styled-components";

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
  const itemList = getCountryKeyValueList();

  return (
    <Container>
      <Controller
        name="excludedRegionList"
        control={control}
        render={({ field }) => (
          <CustomDropdown
            label="서비스 제외 지역"
            items={itemList}
            placeholder="서비스 제외 지역 선택"
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

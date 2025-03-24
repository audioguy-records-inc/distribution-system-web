import { CountryItem, countryList } from "@/constants/country";
import { useEffect, useState } from "react";

import CustomDropdown from "@/components/basic/CustomDropdown";
import { GenderType } from "@/types/artist";

interface ArtistGenderTypeDropdownProps {
  onChange: (genderType: string) => void;
  value: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

const ArtistGenderTypeDropdown = ({
  onChange,
  value,
  readOnly = false,
  required = false,
}: ArtistGenderTypeDropdownProps) => {
  const dropdownItems = Object.values(GenderType).map((genderType) => ({
    key: genderType,
    value: genderType,
  }));

  return (
    <CustomDropdown
      label={"성별"}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder="성별 선택"
      size={"small"}
      width={320}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default ArtistGenderTypeDropdown;

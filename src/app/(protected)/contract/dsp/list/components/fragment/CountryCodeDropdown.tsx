import { CountryItem, countryList } from "@/constants/country";
import { useEffect, useState } from "react";

import CustomDropdown from "@/components/basic/CustomDropdown";

interface CountryCodeDropdownProps {
  onChange: (country: string) => void;
  value: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
}

const CountryCodeDropdown = ({
  onChange,
  value,
  readOnly = false,
}: CountryCodeDropdownProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const dropdownItems = countryList.map((country) => ({
    key: country.countryCode,
    value: `${country.name} (${country.countryCode})`,
  }));

  return (
    <CustomDropdown
      label={"국가관리"}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder="국가 선택"
      size={"small"}
      width={320}
      readOnly={readOnly}
    />
  );
};

export default CountryCodeDropdown;

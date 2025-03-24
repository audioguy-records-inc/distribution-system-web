import { CountryItem, countryList } from "@/constants/country";
import { useEffect, useState } from "react";

import CustomDropdown from "@/components/basic/CustomDropdown";

interface DomainDropdownProps {
  onChange: (domain: string) => void;
  value: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

const DomainDropdown = ({
  onChange,
  value,
  readOnly = false,
  required = false,
}: DomainDropdownProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const dropdownItems = countryList.map((country) => ({
    key: country.countryCode,
    value: `${country.name} (${country.countryCode})`,
  }));

  return (
    <CustomDropdown
      label={"도메인"}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder="도메인 선택"
      size={"small"}
      width={320}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default DomainDropdown;

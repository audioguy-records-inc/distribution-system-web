import { CountryItem, countryList } from "@/constants/country";
import { useEffect, useState } from "react";

import CustomDropdown from "@/components/basic/CustomDropdown";

interface CountryCodeDropdownProps {
  onChange: (country: string) => void;
  value: string | undefined;
  disabled?: boolean;
}

const CountryCodeDropdown = ({
  onChange,
  value,
  disabled = false,
}: CountryCodeDropdownProps) => {
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 국가 목록 로드
    setCountries(countryList);
    setIsLoading(false);
  }, []);

  const dropdownItems = countries.map((country) => ({
    key: country.countryCode,
    value: `${country.name} (${country.countryCode})`,
  }));
  console.log("moonsae contry selectedKey", value);
  return (
    <CustomDropdown
      label={"국가관리"}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder="국가 선택"
      disabled={disabled || isLoading}
      size={"small"}
      width={320}
    />
  );
};

export default CountryCodeDropdown;

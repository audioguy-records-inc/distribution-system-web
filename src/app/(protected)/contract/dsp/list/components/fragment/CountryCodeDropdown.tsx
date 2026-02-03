import { CountryItem, countryList, getCountryKeyValueList } from "@/constants/country";
import { useEffect, useState } from "react";

import CustomDropdown from "@/components/basic/CustomDropdown";
import { useLocale, useTranslations } from "next-intl";

interface CountryCodeDropdownProps {
  onChange: (country: string) => void;
  value: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

const CountryCodeDropdown = ({
  onChange,
  value,
  readOnly = false,
  required = false,
}: CountryCodeDropdownProps) => {
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const dropdownItems = getCountryKeyValueList(locale);

  return (
    <CustomDropdown
      label={tCommon("country")}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder={tCommon("countrySelect")}
      size={"small"}
      width={320}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default CountryCodeDropdown;

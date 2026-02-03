import CustomDropdown from "@/components/basic/CustomDropdown";
import { getCountryKeyValueList } from "@/constants/country";
import { useLocale, useTranslations } from "next-intl";

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
  const ta = useTranslations("artist");
  const locale = useLocale();
  return (
    <CustomDropdown
      label={ta("country")}
      selectedKey={value}
      onSelectKey={onChange}
      items={getCountryKeyValueList(locale)}
      placeholder={ta("countrySelect")}
      size={"small"}
      width={320}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default DomainDropdown;

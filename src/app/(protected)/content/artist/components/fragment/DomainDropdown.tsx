import CustomDropdown from "@/components/basic/CustomDropdown";
import { getCountryKeyValueList } from "@/constants/country";

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
  return (
    <CustomDropdown
      label={"국가"}
      selectedKey={value}
      onSelectKey={onChange}
      items={getCountryKeyValueList()}
      placeholder="국가 선택"
      size={"small"}
      width={320}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default DomainDropdown;

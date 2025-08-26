import { BankNameItem, bankNameList } from "@/constants/bank-name";
import { useEffect, useState } from "react";

import CustomDropdown from "@/components/basic/CustomDropdown";

interface BankNameDropdownProps {
  onChange: (bankName: string) => void;
  value: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

const BankNameDropdown = ({
  onChange,
  value,
  disabled = false,
  readOnly = false,
  required = false,
}: BankNameDropdownProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const dropdownItems = bankNameList.map((bankName) => ({
    key: bankName.bankName,
    value: bankName.bankName,
  }));

  return (
    <CustomDropdown
      label={"은행명"}
      required={required}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder="은행 선택"
      disabled={disabled || isLoading}
      size={"small"}
      width={320}
      readOnly={readOnly}
    />
  );
};

export default BankNameDropdown;

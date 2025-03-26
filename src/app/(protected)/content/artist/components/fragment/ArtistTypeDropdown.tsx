import { useEffect, useState } from "react";

import { ArtistType } from "@/types/artist";
import CustomDropdown from "@/components/basic/CustomDropdown";

interface ArtistTypeDropdownProps {
  onChange: (artistType: string) => void;
  value: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

const ArtistTypeDropdown = ({
  onChange,
  value,
  readOnly = false,
  required = false,
}: ArtistTypeDropdownProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const dropdownItems = Object.values(ArtistType).map((artistType) => ({
    key: artistType,
    value: artistType,
  }));

  return (
    <CustomDropdown
      label={"유형"}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder="유형 선택"
      size={"small"}
      width={320}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default ArtistTypeDropdown;

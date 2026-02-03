import { useEffect, useState } from "react";

import { ArtistType } from "@/types/artist";
import CustomDropdown from "@/components/basic/CustomDropdown";
import { useTranslations } from "next-intl";

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
  const ta = useTranslations("artist");
  const [isLoading, setIsLoading] = useState(true);

  const artistTypeTranslationMap: Record<string, string> = {
    [ArtistType.SOLO]: "artistTypeSolo",
    [ArtistType.GROUP]: "artistTypeGroup",
  };

  const dropdownItems = Object.values(ArtistType).map((artistType) => ({
    key: artistType,
    value: ta(artistTypeTranslationMap[artistType] || artistType),
  }));

  return (
    <CustomDropdown
      label={ta("type")}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder={ta("typeSelect")}
      size={"small"}
      width={320}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default ArtistTypeDropdown;

import CustomDropdown from "@/components/basic/CustomDropdown";
import { GenderType } from "@/types/artist";
import { useTranslations } from "next-intl";

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
  const ta = useTranslations("artist");

  const genderTypeTranslationMap: Record<string, string> = {
    [GenderType.MALE_SOLO]: "genderMaleSolo",
    [GenderType.FEMALE_SOLO]: "genderFemaleSolo",
    [GenderType.MIXED]: "genderMixed",
    [GenderType.MALE_GROUP]: "genderMaleGroup",
    [GenderType.FEMALE_GROUP]: "genderFemaleGroup",
    [GenderType.UNKNOWN]: "genderUnknown",
  };

  const dropdownItems = Object.values(GenderType).map((genderType) => ({
    key: genderType,
    value: ta(genderTypeTranslationMap[genderType] || genderType),
  }));

  return (
    <CustomDropdown
      label={ta("gender")}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder={ta("genderSelect")}
      size={"small"}
      width={320}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default ArtistGenderTypeDropdown;

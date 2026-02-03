import CustomDropdown from "@/components/basic/CustomDropdown";
import { Dsp } from "@/types/dsp";
import { useDspStore } from "@/stores/use-dsp-store";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface DspDropdownProps {
  onChange: (dsp: string) => void;
  value: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

const DspDropdown = ({
  onChange,
  value,
  disabled = false,
  readOnly = false,
  required = false,
}: DspDropdownProps) => {
  const tDsp = useTranslations("dsp");
  const { dsps, fetchDsps, isLoading } = useDspStore();

  useEffect(() => {
    fetchDsps();
  }, [fetchDsps]);

  const dropdownItems = dsps.map((dsp) => ({
    key: dsp._id,
    value: dsp.name,
  }));

  return (
    <CustomDropdown
      label={tDsp("dspName")}
      required={required}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder={tDsp("dspSelect")}
      disabled={disabled || isLoading}
      size={"small"}
      width={320}
      readOnly={readOnly}
    />
  );
};

export default DspDropdown;

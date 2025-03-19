import CustomDropdown from "@/components/basic/CustomDropdown";
import { Dsp } from "@/types/dsp";
import { useDspStore } from "@/stores/use-dsp-store";
import { useEffect } from "react";

interface DspDropdownProps {
  onChange: (dsp: string) => void;
  value: string | undefined;
  disabled?: boolean;
  readOnly?: boolean;
}

const DspDropdown = ({
  onChange,
  value,
  disabled = false,
  readOnly = false,
}: DspDropdownProps) => {
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
      label={"DSP명"}
      selectedKey={value}
      onSelectKey={onChange}
      items={dropdownItems}
      placeholder="DSP 선택"
      disabled={disabled || isLoading}
      size={"small"}
      width={320}
      readOnly={readOnly}
    />
  );
};

export default DspDropdown;

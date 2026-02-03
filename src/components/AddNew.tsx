"use client";

import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import PlusIcon from "@/components/icons/PlusIcon";
import { useTranslations } from "next-intl";

const AddNew = ({
  size = "medium",
}: {
  size?: "medium" | "small" | "large";
}) => {
  const t = useTranslations("common");
  return (
    <ButtonOutlinedPrimary
      label={t("newRegister")}
      leftIcon={<PlusIcon />}
      size={size}
    />
  );
};

export default AddNew;

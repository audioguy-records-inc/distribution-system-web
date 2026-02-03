import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import Announcement from "@/types/announcement";
import { AnnouncementType } from "@/types/announcement";
import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import RowGap from "@/components/basic/RowGap";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAuthStore } from "@/stores/use-auth-store";
import { useTranslations } from "next-intl";

const TypeContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 32px;
`;

const DisabledTypeContainer = styled.div`
  display: flex;
  padding: 16px 32px;
`;

const Label = styled.div`
  ${theme.fonts.body1.medium}
  color: ${theme.colors.gray[400]};
`;

const Value = styled.div`
  ${theme.fonts.body1.medium}
  color: ${theme.colors.gray[800]};
`;

const TypeSelect = ({
  watch,
  setValue,
  disabled = false,
  announcement,
}: {
  watch: UseFormWatch<Announcement>;
  setValue: UseFormSetValue<Announcement>;
  disabled?: boolean;
  announcement?: Announcement;
}) => {
  const t = useTranslations("announcement");
  const { user } = useAuthStore();

  const announcementTypeItems = [
    {
      key: "TRANSMISSION",
      value: t("typeTransmission"),
    },
    {
      key: "SETTLEMENT",
      value: t("typeSettlement"),
    },
    {
      key: "ETC",
      value: t("typeEtc"),
    },
  ];

  const recipientResponsibilityItems = [
    {
      key: "all",
      value: t("recipientAll"),
    },
    {
      key: "settlement",
      value: t("recipientSettlement"),
    },
    {
      key: "contract",
      value: t("recipientContract"),
    },
    {
      key: "promotion",
      value: t("recipientPromotion"),
    },
  ];

  if (disabled) {
    const displayName =
      announcement?.userInfo?.displayName || user?.displayName;

    return (
      <DisabledTypeContainer>
        <Label>{t("author")}</Label>
        <RowGap width={12} />
        <Value>{displayName}</Value>
        <RowGap width={32} />
        <Label>{t("type")}</Label>
        <RowGap width={12} />
        <Value>
          {
            announcementTypeItems.find((item) => item.key === watch("type"))
              ?.value
          }
        </Value>
        <RowGap width={32} />
        <Label>{t("recipientTarget")}</Label>
        <RowGap width={12} />
        <Value>
          {
            recipientResponsibilityItems.find(
              (item) => item.key === watch("recipientResponsibility"),
            )?.value
          }
        </Value>
      </DisabledTypeContainer>
    );
  }

  return (
    <TypeContainer>
      <CustomInput
        label={t("author")}
        value={user?.displayName || ""}
        width={180}
        size="small"
        locked
      />
      <CustomDropdown
        label={t("type")}
        items={announcementTypeItems}
        selectedKey={watch("type")}
        onSelectKey={(value) => setValue("type", value as AnnouncementType)}
        width={180}
        size="small"
      />
      <CustomDropdown
        label={t("recipientTarget")}
        items={recipientResponsibilityItems}
        selectedKey={watch("recipientResponsibility")}
        onSelectKey={(value) => setValue("recipientResponsibility", value)}
        width={180}
        size="small"
      />
    </TypeContainer>
  );
};

export default TypeSelect;

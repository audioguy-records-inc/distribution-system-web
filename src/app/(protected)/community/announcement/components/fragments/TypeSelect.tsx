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
}: {
  watch: UseFormWatch<Announcement>;
  setValue: UseFormSetValue<Announcement>;
  disabled?: boolean;
}) => {
  const { user } = useAuthStore();

  const announcementTypeItems = [
    {
      key: "TRANSMISSION",
      value: "전송",
    },
    {
      key: "SETTLEMENT",
      value: "정산",
    },
    {
      key: "ETC",
      value: "기타",
    },
  ];

  const recipientResponsibilityItems = [
    {
      key: "all",
      value: "전체",
    },
    {
      key: "settlement",
      value: "정산",
    },
    {
      key: "contract",
      value: "계약",
    },
    {
      key: "promotion",
      value: "프로모션",
    },
  ];

  if (disabled) {
    return (
      <DisabledTypeContainer>
        <Label>작성자</Label>
        <RowGap width={12} />
        <Value>{user?.displayName}</Value>
        <RowGap width={32} />
        <Label>구분</Label>
        <RowGap width={12} />
        <Value>
          {
            announcementTypeItems.find((item) => item.key === watch("type"))
              ?.value
          }
        </Value>
        <RowGap width={32} />
        <Label>전송 대상</Label>
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
        label="작성자"
        value={user?.displayName || ""}
        width={180}
        size="small"
        locked
      />
      <CustomDropdown
        label="구분"
        items={announcementTypeItems}
        selectedKey={watch("type")}
        onSelectKey={(value) => setValue("type", value as AnnouncementType)}
        width={180}
        size="small"
      />
      <CustomDropdown
        label="전송 대상"
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

import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import Announcement from "@/types/announcement";
import { AnnouncementType } from "@/types/announcement";
import CustomDropdown from "@/components/basic/CustomDropdown";
import CustomInput from "@/components/basic/CustomInput";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";

const TypeContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 32px;
`;

const TypeSelect = ({
  watch,
  setValue,
}: {
  watch: UseFormWatch<Announcement>;
  setValue: UseFormSetValue<Announcement>;
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

  return (
    <TypeContainer>
      <CustomInput
        label="작성자"
        value={user?.displayName}
        locked
        width={180}
        size="small"
      />
      <CustomDropdown
        label="구분 "
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

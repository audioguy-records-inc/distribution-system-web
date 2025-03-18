import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import { ContactPerson } from "@/types/contact-person";
import Gap from "@/components/basic/Gap";
import PlusIcon from "@/components/icons/PlusIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div``;

const Header = styled.div`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[600]};
`;

interface ContactPersonTableProps {
  onChange: (value: ContactPerson[]) => void;
  value: ContactPerson[];
  disabled?: boolean;
}

const ContactPersonTable = ({
  onChange,
  value,
  disabled,
}: ContactPersonTableProps) => {
  const columns: Column<ContactPerson>[] = [
    {
      header: "담당자명",
      accessor: "name",
      type: "input",
      width: 160,
    },
    {
      header: "구분",
      accessor: "responsibility",
      type: "dropdown",
      width: 160,
      dropdownOptions: [
        { key: "contract", value: "계약" },
        { key: "settlement", value: "정산" },
        { key: "promotion", value: "프로모션" },
      ],
    },
    {
      header: "이메일",
      accessor: "email",
      type: "input",
      width: 268,
    },
    {
      header: "연락처",
      accessor: "phone",
      type: "input",
      width: 268,
    },
    {
      header: "",
      accessor: "action" as keyof ContactPerson,
      type: "button",
      icon: <TrashIcon />,
      onClick: (record, rowIndex) => {
        const newValue = [...value];
        newValue.splice(rowIndex, 1);
        onChange(newValue);
      },
    },
  ];
  return (
    <Container>
      <Header>담당자 정보</Header>
      <Gap height={16} />
      <CustomTable
        columns={columns}
        data={value}
        onChange={onChange}
        disabled={disabled}
        size="small"
      />
      <Gap height={12} />
      <ButtonOutlinedSecondary
        size="medium"
        expand
        leftIcon={<PlusIcon />}
        label="추가"
        onClick={() => {
          const newValue = [...value];
          newValue.push({
            name: "",
            responsibility: null,
            email: "",
            phone: "",
          });
          onChange(newValue);
        }}
      />
    </Container>
  );
};

export default ContactPersonTable;

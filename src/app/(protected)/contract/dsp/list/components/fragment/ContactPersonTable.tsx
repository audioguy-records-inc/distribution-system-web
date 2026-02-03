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
import { useTranslations } from "next-intl";

const Container = styled.div``;

const Header = styled.div`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[600]};
`;

interface ContactPersonTableProps {
  onChange: (value: ContactPerson[]) => void;
  value: ContactPerson[];
  disabled?: boolean;
  readOnly?: boolean;
}

const ContactPersonTable = ({
  onChange,
  value,
  disabled,
  readOnly,
}: ContactPersonTableProps) => {
  const tContact = useTranslations("contact");
  const tCommon = useTranslations("common");
  const columns: Column<ContactPerson>[] = [
    {
      header: tContact("contactName"),
      accessor: "name",
      type: "input",
      width: 160,
    },
    {
      header: tContact("contactType"),
      accessor: "responsibility",
      type: "dropdown",
      width: 160,
      dropdownOptions: [
        { key: "contract", value: tContact("typeContract") },
        { key: "settlement", value: tContact("typeSettlement") },
        { key: "promotion", value: tContact("typePromotion") },
      ],
    },
    {
      header: tContact("email"),
      accessor: "email",
      type: "input",
      width: 268,
    },
    {
      header: tContact("phone"),
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
      <Header>{tContact("contactInfo")}</Header>
      <Gap height={16} />
      <CustomTable
        columns={columns}
        data={value}
        onChange={onChange}
        disabled={disabled}
        size="small"
        readOnly={readOnly}
      />
      <Gap height={12} />
      {!readOnly && (
        <ButtonOutlinedSecondary
          size="medium"
          expand
          leftIcon={<PlusIcon />}
          label={tCommon("add")}
          onClick={() => {
            if (readOnly || disabled) return;

            if (!value) {
              onChange([
                {
                  name: "",
                  responsibility: null,
                  email: "",
                  phone: "",
                },
              ]);
            } else {
              const newValue = [...value];
              newValue.push({
                name: "",
                responsibility: null,
                email: "",
                phone: "",
              });
              onChange(newValue);
            }
          }}
        />
      )}
    </Container>
  );
};

export default ContactPersonTable;

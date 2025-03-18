import CustomCheckbox from "@/components/basic/CustomCheckbox";
import { contractProductItemList } from "@/constants/contract-product-item";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.div`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[600]};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const CheckboxWrapper = styled.div`
  flex: 0 0 calc(25% - 12px); // 4개씩 배치하기 위한 너비 계산 (간격 고려)
  min-width: 150px; // 최소 너비 설정
`;

interface ContractProductItemProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ContractProductItem = ({ value, onChange }: ContractProductItemProps) => {
  return (
    <Container>
      <Header>계약 상품</Header>
      <Row>
        {contractProductItemList.map((item) => (
          <CheckboxWrapper key={item.key}>
            <CustomCheckbox
              checked={value?.includes(item.key)}
              onChange={(checked) => {
                const newValue = checked
                  ? [...(value || []), item.key]
                  : (value || []).filter((key: string) => key !== item.key);
                onChange(newValue);
              }}
              label={item.value}
            />
          </CheckboxWrapper>
        ))}
      </Row>
    </Container>
  );
};

export default ContractProductItem;

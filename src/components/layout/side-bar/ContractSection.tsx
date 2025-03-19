import {
  MenuGroup,
  MenuGroupButton,
  MenuItem,
  MenuItemLink,
  MenuLabel,
} from "./fragment/MenuItem";

import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import Gap from "@/components/basic/Gap";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div``;

const ContractSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <MenuGroupButton onClick={() => setIsOpen(!isOpen)}>
        계약 관리
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuGroupButton>

      <MenuGroup $isOpen={isOpen}>
        <Gap height={12} />
        <MenuLabel>DSP</MenuLabel>
        <Gap height={16} />

        <MenuItemLink href="/contract/dsp/list">
          <MenuItem>리스트 조회/등록</MenuItem>
        </MenuItemLink>

        <Gap height={20} />
        <MenuLabel>권리사</MenuLabel>
        <Gap height={16} />

        <MenuItemLink href="/contract/licensor/list">
          <MenuItem>리스트 조회/등록</MenuItem>
        </MenuItemLink>

        <Gap height={12} />

        <MenuItemLink href="/contract/licensor/contract-info">
          <MenuItem>계약 정보 조회/등록</MenuItem>
        </MenuItemLink>
      </MenuGroup>
    </Container>
  );
};

export default ContractSection;

import {
  MenuGroup,
  MenuGroupButton,
  MenuItem,
  MenuItemLink,
  MenuLabel,
} from "./fragment/MenuItem";

import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { AuthLevel } from "@/types/user";
import Gap from "@/components/basic/Gap";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div``;

const ServiceSection = ({ authLevel }: { authLevel: AuthLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <MenuGroupButton onClick={() => setIsOpen(!isOpen)}>
        서비스 현황
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuGroupButton>

      <MenuGroup $isOpen={isOpen}>
        <Gap height={12} />
        <MenuLabel>정산 현황</MenuLabel>
        <Gap height={16} />
        <MenuItemLink href="/service/settlement-status/list">
          <MenuItem>정산금 조회</MenuItem>
        </MenuItemLink>
        <Gap height={12} />
        <MenuItemLink href="/service/settlement-status/detail">
          <MenuItem>상세내역 조회</MenuItem>
        </MenuItemLink>

        {authLevel === AuthLevel.ADMIN && (
          <>
            <Gap height={20} />
            <MenuLabel>관리자 정산</MenuLabel>
            <Gap height={16} />
            <MenuItemLink href="/service/admin-settlement/distribution">
              <MenuItem>유통 정산 현황</MenuItem>
            </MenuItemLink>
          </>
        )}
      </MenuGroup>
    </Container>
  );
};

export default ServiceSection;

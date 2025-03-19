import {
  MenuGroup,
  MenuGroupButton,
  MenuItem,
  MenuItemLink,
} from "./fragment/MenuItem";

import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import Gap from "@/components/basic/Gap";
import Link from "next/link";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useState } from "react";

const Container = styled.div``;

const CommunitySection = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <MenuGroupButton onClick={() => setIsOpen(!isOpen)}>
        커뮤니티
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuGroupButton>
      <Gap height={12} />
      <MenuGroup $isOpen={isOpen}>
        <MenuItemLink href="/community/notice">
          <MenuItem>공지사항</MenuItem>
        </MenuItemLink>
      </MenuGroup>
    </Container>
  );
};

export default CommunitySection;

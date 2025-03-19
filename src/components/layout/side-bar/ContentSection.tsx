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

const ContentSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <MenuGroupButton onClick={() => setIsOpen(!isOpen)}>
        콘텐츠 관리
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuGroupButton>

      <MenuGroup $isOpen={isOpen}>
        <Gap height={12} />
        <MenuLabel>앨범</MenuLabel>
        <Gap height={16} />
        <MenuItemLink href="/content/album/list">
          <MenuItem>리스트 조회</MenuItem>
        </MenuItemLink>
        <Gap height={12} />
        <MenuItemLink href="/content/album/new">
          <MenuItem>신규 앨범 등록</MenuItem>
        </MenuItemLink>
        <Gap height={20} />
        <MenuLabel>영상</MenuLabel>
        <Gap height={16} />
        <MenuItemLink href="/content/video/list">
          <MenuItem>리스트 조회</MenuItem>
        </MenuItemLink>
        <Gap height={12} />
        <MenuItemLink href="/content/video/new">
          <MenuItem>신규 영상 등록</MenuItem>
        </MenuItemLink>
        <Gap height={20} />
        <MenuLabel>아티스트</MenuLabel>
        <Gap height={16} />
        <MenuItemLink href="/content/artist">
          <MenuItem>아티스트 관리</MenuItem>
        </MenuItemLink>
      </MenuGroup>
    </Container>
  );
};

export default ContentSection;

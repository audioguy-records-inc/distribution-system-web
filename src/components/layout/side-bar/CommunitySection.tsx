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
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const CommunitySection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("sidebar");
  return (
    <Container>
      <MenuGroupButton onClick={() => setIsOpen(!isOpen)}>
        {t("community")}
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuGroupButton>
      <Gap height={12} />
      <MenuGroup $isOpen={isOpen}>
        <MenuItemLink href="/community/announcement">
          <MenuItem
            $isActive={
              pathname === "/community/announcement" ||
              pathname.startsWith("/community/announcement/")
            }
          >
            {t("announcement")}
          </MenuItem>
        </MenuItemLink>
      </MenuGroup>
    </Container>
  );
};

export default CommunitySection;

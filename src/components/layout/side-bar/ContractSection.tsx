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
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const ContractSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("sidebar");
  return (
    <Container>
      <MenuGroupButton onClick={() => setIsOpen(!isOpen)}>
        {t("contract")}
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuGroupButton>

      <MenuGroup $isOpen={isOpen}>
        <Gap height={12} />
        <MenuLabel>{t("dsp")}</MenuLabel>
        <Gap height={16} />

        <MenuItemLink href="/contract/dsp/list">
          <MenuItem
            $isActive={
              pathname === "/contract/dsp/list" ||
              pathname.startsWith("/contract/dsp/list/")
            }
          >
            {t("listViewRegister")}
          </MenuItem>
        </MenuItemLink>

        <Gap height={20} />
        <MenuLabel>{t("licensor")}</MenuLabel>
        <Gap height={16} />

        <MenuItemLink href="/contract/licensor/list">
          <MenuItem
            $isActive={
              pathname === "/contract/licensor/list" ||
              pathname.startsWith("/contract/licensor/list/")
            }
          >
            {t("listViewRegister")}
          </MenuItem>
        </MenuItemLink>

        <Gap height={12} />

        <MenuItemLink href="/contract/licensor/contract-info">
          <MenuItem
            $isActive={
              pathname === "/contract/licensor/contract-info" ||
              pathname.startsWith("/contract/licensor/contract-info/")
            }
          >
            {t("contractInfoViewRegister")}
          </MenuItem>
        </MenuItemLink>
      </MenuGroup>
    </Container>
  );
};

export default ContractSection;

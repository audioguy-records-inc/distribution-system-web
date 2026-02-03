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
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const ServiceSection = ({ authLevel }: { authLevel: AuthLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("sidebar");
  return (
    <Container>
      <MenuGroupButton onClick={() => setIsOpen(!isOpen)}>
        {t("service")}
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuGroupButton>

      <MenuGroup $isOpen={isOpen}>
        <Gap height={12} />
        <MenuLabel>{t("settlement")}</MenuLabel>
        <Gap height={16} />
        <MenuItemLink href="/service/settlement-status/list">
          <MenuItem
            $isActive={
              pathname === "/service/settlement-status/list" ||
              pathname.startsWith("/service/settlement-status/list/")
            }
          >
            {t("settlementView")}
          </MenuItem>
        </MenuItemLink>
        <Gap height={12} />
        <MenuItemLink href="/service/settlement-status/detail">
          <MenuItem
            $isActive={
              pathname === "/service/settlement-status/detail" ||
              pathname.startsWith("/service/settlement-status/detail/")
            }
          >
            {t("detailView")}
          </MenuItem>
        </MenuItemLink>

        {authLevel === AuthLevel.ADMIN && (
          <>
            <Gap height={20} />
            <MenuLabel>{t("adminSettlement")}</MenuLabel>
            <Gap height={16} />
            <MenuItemLink href="/service/admin-settlement/distribution">
              <MenuItem
                $isActive={
                  pathname === "/service/admin-settlement/distribution" ||
                  pathname.startsWith("/service/admin-settlement/distribution/")
                }
              >
                {t("distributionSettlement")}
              </MenuItem>
            </MenuItemLink>
          </>
        )}
      </MenuGroup>
    </Container>
  );
};

export default ServiceSection;

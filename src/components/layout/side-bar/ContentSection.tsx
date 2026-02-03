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
import { useTrackStore } from "@/stores/use-track-store";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const ContentSection = ({ authLevel }: { authLevel: AuthLevel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resetTracks } = useTrackStore();
  const pathname = usePathname();
  const t = useTranslations("sidebar");
  return (
    <Container>
      <MenuGroupButton onClick={() => setIsOpen(!isOpen)}>
        {t("content")}
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuGroupButton>

      <MenuGroup $isOpen={isOpen}>
        <Gap height={12} />
        <MenuLabel>{t("album")}</MenuLabel>

        {authLevel === AuthLevel.ADMIN && (
          <>
            <Gap height={12} />
            <MenuItemLink
              href="/content/album/new"
              onClick={() => resetTracks()}
            >
              <MenuItem $isActive={pathname === "/content/album/new"}>
                {t("newAlbum")}
              </MenuItem>
            </MenuItemLink>
          </>
        )}
        <MenuItemLink href="/content/album/list">
          <MenuItem
            $isActive={
              pathname === "/content/album/list" ||
              pathname.startsWith("/content/album/list/")
            }
          >
            {t("listView")}
          </MenuItem>
        </MenuItemLink>

        <Gap height={20} />
        <MenuLabel>{t("video")}</MenuLabel>

        {authLevel === AuthLevel.ADMIN && (
          <>
            <Gap height={12} />
            <MenuItemLink href="/content/video/new">
              <MenuItem $isActive={pathname === "/content/video/new"}>
                {t("newVideo")}
              </MenuItem>
            </MenuItemLink>
          </>
        )}
        <MenuItemLink href="/content/video/list">
          <MenuItem
            $isActive={
              pathname === "/content/video/list" ||
              pathname.startsWith("/content/video/list/")
            }
          >
            {t("listView")}
          </MenuItem>
        </MenuItemLink>

        {authLevel === AuthLevel.ADMIN && (
          <>
            <Gap height={20} />
            <MenuLabel>{t("artist")}</MenuLabel>
            <MenuItemLink href="/content/artist">
              <MenuItem
                $isActive={
                  pathname === "/content/artist" ||
                  pathname.startsWith("/content/artist/")
                }
              >
                {t("artistManage")}
              </MenuItem>
            </MenuItemLink>
          </>
        )}
      </MenuGroup>
    </Container>
  );
};

export default ContentSection;

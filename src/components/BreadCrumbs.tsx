// components/Breadcrumbs.tsx
"use client";

import ArrowRightIcon from "./icons/ArrowRightIcon";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import LoginInfo from "./LoginInfo";
import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RightSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PrevBreadcrumb = styled.div`
  ${theme.fonts.heading2.regular};
  color: ${theme.colors.gray[300]};
`;

const CurrentBreadcrumb = styled.div`
  ${theme.fonts.heading2.medium};
  color: ${theme.colors.gray[800]};
`;

const Breadcrumbs = () => {
  const pathname = usePathname();
  const t = useTranslations("breadcrumbs");

  const renderBreadcrumbs = () => {
    if (pathname.match(/^\/content\/album\/list\/[^\/]+$/)) {
      return (
        <BreadcrumbWrapper>
          <PrevBreadcrumb>{t("contentManagement")}</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>{t("album")}</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>{t("listView")}</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>{t("detail")}</CurrentBreadcrumb>
        </BreadcrumbWrapper>
      );
    }

    if (pathname.match(/^\/content\/video\/list\/[^\/]+$/)) {
      return (
        <BreadcrumbWrapper>
          <PrevBreadcrumb>{t("contentManagement")}</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>{t("video")}</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>{t("listView")}</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>{t("detail")}</CurrentBreadcrumb>
        </BreadcrumbWrapper>
      );
    }

    if (pathname.match(/^\/community\/announcement\/[^\/]+$/)) {
      return (
        <BreadcrumbWrapper>
          <PrevBreadcrumb>{t("community")}</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>{t("announcement")}</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>{t("detail")}</CurrentBreadcrumb>
        </BreadcrumbWrapper>
      );
    }

    switch (pathname) {
      case "/contract/dsp/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("contractManagement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("dsp")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("listViewRegister")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );
      case "/contract/licensor/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("contractManagement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("licensor")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("listViewRegister")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );
      case "/contract/licensor/contract-info":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("contractManagement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("licensor")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("contractInfoViewRegister")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/album/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("contentManagement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("album")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("listView")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/album/new":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("contentManagement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("album")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("newAlbum")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/video/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("contentManagement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("video")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("listView")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/video/new":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("contentManagement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("video")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("newVideo")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/artist":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("contentManagement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("artist")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("artistManage")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/service/settlement-status/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("serviceStatus")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("settlementStatus")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("settlementView")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/service/settlement-status/detail":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("serviceStatus")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("settlementStatus")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("detailView")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/service/admin-settlement/distribution":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("serviceStatus")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>{t("adminSettlement")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("distributionSettlement")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/community/announcement":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>{t("community")}</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>{t("announcement")}</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );
    }
  };

  return (
    <Container>
      {renderBreadcrumbs()}
      <RightSection>
        <LoginInfo />
        <LanguageSwitcher />
      </RightSection>
    </Container>
  );
};

export default Breadcrumbs;

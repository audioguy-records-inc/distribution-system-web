// components/Breadcrumbs.tsx
"use client";

import ArrowRightIcon from "./icons/ArrowRightIcon";
import Link from "next/link";
import LoginInfo from "./LoginInfo";
import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";
import { usePathname } from "next/navigation";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
  background: #0a0a0a;
  color: #fafafa;
  padding: 18px 60px;
  border-bottom: 1px solid #2a2a2a;
  min-height: 76px;

  @media (max-width: 768px) {
    padding: 16px 0;
    flex-wrap: wrap;
  }
`;

const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #f2592a;
    flex-shrink: 0;
  }

  svg path {
    stroke: #6a6a6a;
  }
`;

const PrevBreadcrumb = styled.div`
  ${theme.fonts.mono};
  font-size: 12px;
  line-height: 16px;
  color: #8a8a8a;
`;

const CurrentBreadcrumb = styled.div`
  ${theme.fonts.mono};
  font-size: 12px;
  line-height: 16px;
  color: #fafafa;
`;

const Breadcrumbs = () => {
  const pathname = usePathname();

  const renderBreadcrumbs = () => {
    // 동적 라우트 매칭을 위해 정규식 사용
    if (pathname.match(/^\/content\/album\/list\/[^\/]+$/)) {
      return (
        <BreadcrumbWrapper>
          <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>앨범</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>리스트 조회</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>상세</CurrentBreadcrumb>
        </BreadcrumbWrapper>
      );
    }

    if (pathname.match(/^\/content\/video\/list\/[^\/]+$/)) {
      return (
        <BreadcrumbWrapper>
          <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>영상</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>리스트 조회</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>상세</CurrentBreadcrumb>
        </BreadcrumbWrapper>
      );
    }

    if (pathname.match(/^\/community\/announcement\/[^\/]+$/)) {
      return (
        <BreadcrumbWrapper>
          <PrevBreadcrumb>커뮤니티</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>공지사항</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>상세</CurrentBreadcrumb>
        </BreadcrumbWrapper>
      );
    }

    switch (pathname) {
      case "/contract/dsp/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>계약 관리</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>DSP</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>리스트 조회/등록</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );
      case "/contract/licensor/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>계약 관리</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>권리자</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>리스트 조회/등록</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );
      case "/contract/licensor/contract-info":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>계약 관리</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>권리자</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>계약 정보 조회/등록</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/album/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>앨범</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>리스트 조회</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/album/new":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>앨범</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>신규 앨범 등록</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/video/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>영상 </PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>리스트 조회</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/video/new":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>영상 </PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>신규 영상 등록</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/content/artist":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>아티스트</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>아티스트 관리</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/service/settlement-status/list":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>서비스 현황</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>정산 현황</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>정산금 조회</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/service/settlement-status/detail":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>서비스 현황</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>정산 현황</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>상세내역 조회</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/service/admin-settlement/distribution":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>서비스 현황</PrevBreadcrumb>
            <ArrowRightIcon />
            <PrevBreadcrumb>관리자 정산</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>유통 정산 현황</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );

      case "/community/announcement":
        return (
          <BreadcrumbWrapper>
            <PrevBreadcrumb>커뮤니티</PrevBreadcrumb>
            <ArrowRightIcon />
            <CurrentBreadcrumb>공지사항</CurrentBreadcrumb>
          </BreadcrumbWrapper>
        );
    }
  };

  return (
    <Container>
      {renderBreadcrumbs()}
      <LoginInfo />
    </Container>
  );
};

export default Breadcrumbs;

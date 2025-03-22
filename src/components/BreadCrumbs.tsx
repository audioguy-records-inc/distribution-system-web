// components/Breadcrumbs.tsx
"use client";

import ArrowRightIcon from "./icons/ArrowRightIcon";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";
import { usePathname } from "next/navigation";

const Container = styled.div`
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

  switch (pathname) {
    case "/contract/dsp/list":
      return (
        <Container>
          <PrevBreadcrumb>계약 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>DSP</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>리스트 조회/등록</CurrentBreadcrumb>
        </Container>
      );
    case "/contract/licensor/list":
      return (
        <Container>
          <PrevBreadcrumb>계약 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>권리사</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>리스트 조회/등록</CurrentBreadcrumb>
        </Container>
      );
    case "/contract/licensor/contract-info":
      return (
        <Container>
          <PrevBreadcrumb>계약 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>권리사</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>계약 정보 조회/등록</CurrentBreadcrumb>
        </Container>
      );

    case "/content/album/list":
      return (
        <Container>
          <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>앨범</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>리스트 조회</CurrentBreadcrumb>
        </Container>
      );

    case "/content/album/new":
      return (
        <Container>
          <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>앨범</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>신규 앨범 등록</CurrentBreadcrumb>
        </Container>
      );

    case "/content/video/list":
      return (
        <Container>
          <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>영상 </PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>리스트 조회</CurrentBreadcrumb>
        </Container>
      );

    case "/content/video/new":
      return (
        <Container>
          <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>영상 </PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>신규 영상 등록</CurrentBreadcrumb>
        </Container>
      );

    case "/content/artist":
      return (
        <Container>
          <PrevBreadcrumb>콘텐츠 관리</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>아티스트</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>아티스트 관리</CurrentBreadcrumb>
        </Container>
      );

    case "/service/settlement-status/list":
      return (
        <Container>
          <PrevBreadcrumb>서비스 현황</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>정산 현황</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>정산금 조회</CurrentBreadcrumb>
        </Container>
      );

    case "/service/settlement-status/detail":
      return (
        <Container>
          <PrevBreadcrumb>서비스 현황</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>정산 현황</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>상세내역 조회</CurrentBreadcrumb>
        </Container>
      );

    case "/service/admin-settlement/distribution":
      return (
        <Container>
          <PrevBreadcrumb>서비스 현황</PrevBreadcrumb>
          <ArrowRightIcon />
          <PrevBreadcrumb>관리자 정산</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>유통 정산 현황</CurrentBreadcrumb>
        </Container>
      );

    case "/community/notice":
      return (
        <Container>
          <PrevBreadcrumb>커뮤니티</PrevBreadcrumb>
          <ArrowRightIcon />
          <CurrentBreadcrumb>공지사항</CurrentBreadcrumb>
        </Container>
      );
  }
};

export default Breadcrumbs;

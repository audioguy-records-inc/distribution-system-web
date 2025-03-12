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
  const pathname = usePathname(); // 예: "/contract/dsp/list"
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Container>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          {index === segments.length - 1 ? (
            <CurrentBreadcrumb>{segment}</CurrentBreadcrumb>
          ) : (
            <PrevBreadcrumb>{segment}</PrevBreadcrumb>
          )}
          {index < segments.length - 1 && (
            <ArrowRightIcon color={theme.colors.gray[500]} />
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Breadcrumbs;

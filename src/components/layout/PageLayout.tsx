"use client";

import styled from "styled-components";

const PageLayout = styled.main`
  flex: 1;
  padding: 0 0 100px 320px;
  background-color: #fafafa;
  min-height: 100vh;

  > :last-child {
    padding: 8px 60px 0;
  }

  @media (max-width: 768px) {
    padding: 0 0 64px 0;

    > :last-child {
      padding: 8px 0 0;
    }
  }
`;

export default PageLayout;

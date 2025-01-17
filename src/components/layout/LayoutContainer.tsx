"use client";

import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex: 1; /* #__next 내부에서 남는 영역 사용 */
  min-height: 100%; /* 반응형으로 세로 영역 자동 확장 */
  background-color: #fafafa;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default LayoutContainer;

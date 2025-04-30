"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: var(--font-pretendard);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #FFFFFF;
    color: #333333;

    font-synthesis: none;
  }

     /* Next.js 루트 컨테이너 스타일 */
  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* 화면 세로 전체 사용 */
    max-width: 1440px; /* 기본 폭 */
    margin: 0 auto; /* 가운데 정렬 */
  }

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    #__next {
      max-width: 100%; /* 화면 크기에 맞게 */
      padding: 0 16px; /* 모바일 간격 조정 */
    }
  }

  /* 기본 요소 스타일 */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: inherit;
  }

  p, span, a, li, div {
    font-weight: 400;
    color: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button,
  [role="button"],
  .button {
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
  }

  /* 스크롤바 스타일 (선택 사항) */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  ::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border-radius: 4px;
  }

`;
export default GlobalStyles;

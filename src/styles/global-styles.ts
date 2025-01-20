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
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    line-height: 1.5; /* 기본 가독성을 위한 행간 */
    -webkit-font-smoothing: antialiased; /* 폰트 렌더링 부드럽게 */
    -moz-osx-font-smoothing: grayscale; /* MacOS 렌더링 부드럽게 */
    background-color: #FFFFFF; /* 기본 배경색 */
    color: #333333; /* 기본 텍스트 색상 */
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
    font-family: 'Pretendard', sans-serif;
    font-weight: 600; /* 기본적으로 semibold */
    color: inherit;
  }

  p, span, a, li, div {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400; /* 기본적으로 regular */
    color: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Pretendard', sans-serif;
    font-weight: 500; /* medium */
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

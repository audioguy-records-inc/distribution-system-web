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
    font-family: sans-serif;
    /* background-color: #F00; */
  }

   /* // 전체 컨테이너 사이즈 설정
   #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh; // 화면 세로 전체 사용
    max-width: 1440px; // 요청하신 기본 폭
    min-height: 1204px; // 요청하신 기본 높이
    margin: 0 auto; // 가운데 정렬
  } */

  /* // 반응형 예시 (768px 이하)
  @media (max-width: 768px) {
    #__next {
      max-width: 100%;
      min-height: auto;
    }
  }  */

`;
export default GlobalStyles;

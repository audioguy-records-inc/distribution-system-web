import { Geist, Geist_Mono } from "next/font/google";

// import "./globals.css";
import GlobalStyles from "@/styles/global-styles";
import LayoutContainer from "@/components/layout/LayoutContainer";
import MainContent from "@/components/layout/MainContent";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import StyledComponentsRegistry from "@/lib/registry";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "오디오가이 유통시스템",
  description: "",
};

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.className}>
      <body className={pretendard.className}>
        <StyledComponentsRegistry>
          {/* 전역 스타일 적용 */}
          <GlobalStyles />

          <LayoutContainer>
            {/* 왼쪽 사이드바 */}
            <Sidebar />

            {/* 메인 콘텐츠 */}
            <MainContent>{children}</MainContent>
          </LayoutContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

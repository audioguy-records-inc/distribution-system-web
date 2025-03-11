import LayoutContainer from "@/components/layout/LayoutContainer";
import MainContent from "@/components/layout/MainContent";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "오디오가이 유통시스템 - 관리자",
  description: "",
};

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
}

import AuthGuard from "@/components/AuthGuard";
import Breadcrumbs from "@/components/BreadCrumbs";
import LayoutContainer from "@/components/layout/LayoutContainer";
import MainContent from "@/components/layout/PageLayout";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/side-bar/Sidebar";

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
    <AuthGuard>
      <LayoutContainer>
        <Sidebar />
        <MainContent>
          <Breadcrumbs />
          {children}
        </MainContent>
      </LayoutContainer>
    </AuthGuard>
  );
}

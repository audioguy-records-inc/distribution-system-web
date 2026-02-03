import AuthGuard from "@/components/AuthGuard";
import Breadcrumbs from "@/components/BreadCrumbs";
import LayoutContainer from "@/components/layout/LayoutContainer";
import PageLayout from "@/components/layout/PageLayout";
import Sidebar from "@/components/layout/side-bar/Sidebar";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return { title: t("titleAdmin"), description: "" };
}

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <LayoutContainer>
        <Sidebar />
        <PageLayout>
          <Breadcrumbs />
          {children}
        </PageLayout>
      </LayoutContainer>
    </AuthGuard>
  );
}

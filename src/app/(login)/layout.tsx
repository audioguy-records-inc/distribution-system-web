import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오디오가이 유통시스템 - 로그인",
  description: "",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import CustomToaster from "@/components/CustomToaster";
import GlobalStyles from "@/styles/global-styles";
import StyledComponentsRegistry from "@/lib/registry";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { TranslationsInitializer } from "@/i18n/TranslationsInitializer";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${pretendard.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TranslationsInitializer />
          <StyledComponentsRegistry>
            <GlobalStyles />
            {children}
            <CustomToaster />
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

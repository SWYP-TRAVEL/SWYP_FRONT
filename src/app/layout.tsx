import type { Metadata } from "next";
import "@fontsource/pretendard";
import "./globals.css";

export const metadata: Metadata = {
  title: "Momentier",
  description: "순간(Moment) + Engineer 감정 기반 여행 큐레이팅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

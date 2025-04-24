import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Momentier",
  description: "순간(Moment) + Engineer 감정 기반 여행 큐레이팅",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}

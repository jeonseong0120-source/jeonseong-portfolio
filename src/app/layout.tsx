import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "전성 | Product Engineer",
  description: "사용자에게 닿는 흐름까지 직접 확인하며 만드는 개발자 전성의 포트폴리오",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

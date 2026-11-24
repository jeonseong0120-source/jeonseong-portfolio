import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "전성 | 백엔드 개발자 포트폴리오",
    template: "%s | 전성 포트폴리오",
  },
  description: "API 구현부터 실제 화면과 사용자 흐름까지 확인하며 만드는 백엔드 개발자 전성의 포트폴리오",
  keywords: ["전성", "백엔드 개발자", "Spring Boot", "Next.js", "포트폴리오"],
  authors: [{ name: "전성" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: deploymentHost
    ? new URL(`https://${deploymentHost}`)
    : new URL("http://localhost:3000"),
  title: {
    default: "전성 | 백엔드 개발자 포트폴리오",
    template: "%s | 전성 포트폴리오",
  },
  description: "API 구현부터 실제 화면과 사용자 흐름까지 확인하며 만드는 백엔드 개발자 전성의 포트폴리오",
  keywords: ["전성", "백엔드 개발자", "Spring Boot", "Next.js", "포트폴리오"],
  authors: [{ name: "전성" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "전성 | Java·Spring 백엔드 개발자",
    description: "팀 프로젝트에서 구현하고 확인한 백엔드 문제 해결 사례",
    siteName: "전성 백엔드 개발자 포트폴리오",
  },
  twitter: {
    card: "summary_large_image",
    title: "전성 | Java·Spring 백엔드 개발자",
    description: "팀 프로젝트에서 구현하고 확인한 백엔드 문제 해결 사례",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

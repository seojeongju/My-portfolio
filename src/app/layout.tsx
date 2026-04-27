import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "My Portfolio | 사이버틱 개인 포트폴리오",
  description: "하드웨어, 소프트웨어, 디자인을 아우르는 나만의 포트폴리오 및 이력서 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <footer className="py-10 border-t border-mint/10 glass mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center text-foreground/50 text-sm">
            © {new Date().getFullYear()} My Portfolio. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

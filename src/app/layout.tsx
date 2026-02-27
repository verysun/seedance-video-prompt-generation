import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 视频提示词生成器 - Seedance 2.0",
  description: "输入视频需求，AI 自动生成专业分镜提示词，支持运镜、景别、节奏控制，适配 Seedance 2.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "学伴小智 | 高中生AI学习伙伴",
  description:
    "为高中生打造的智能学习伙伴，探索间隔重复、主动回忆、费曼技巧等新时代学习方法，陪你制定计划、答疑解惑、保持动力。",
  keywords: ["高中生", "学习方法", "AI学习伙伴", "间隔重复", "主动回忆", "费曼技巧"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${poppins.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

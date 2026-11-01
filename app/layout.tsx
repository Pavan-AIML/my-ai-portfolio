import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pavan Kumar | Full-Stack AI Engineer",
  description:
    "Full-Stack AI Engineer based in Munich. 4+ years building production AI: LLM agents, RAG pipelines, MLOps on AWS/Azure, and the full-stack & DevOps around them.",
  openGraph: {
    title: "Pavan Kumar | Full-Stack AI Engineer",
    description:
      "Full-Stack AI Engineer based in Munich. LLM agents, RAG, MLOps, and the full-stack & DevOps around them.",
    url: "https://pavantum-ai-portfolio.vercel.app",
    siteName: "Pavan Kumar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan Kumar | Full-Stack AI Engineer",
    description:
      "Full-Stack AI Engineer based in Munich. LLM agents, RAG, MLOps, and the full-stack & DevOps around them.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

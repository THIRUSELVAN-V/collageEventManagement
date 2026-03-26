import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "EduEvents – Admin Control Panel",
  description: "Admin Event Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="flex min-h-screen" style={{ background: "var(--page-bg)" }}>
          <Sidebar />
          <div className="flex-1 ml-[232px]">
            <Header />
            <main className="mt-[58px] min-h-[calc(100vh-58px)] p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

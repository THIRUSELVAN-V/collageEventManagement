import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "EduEvents – Faculty Portal",
  description: "Faculty Event Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="flex min-h-screen" style={{ background: "#f1f5f9" }}>
          <Sidebar />
          <div className="flex-1 ml-[240px]">
            <Header />
            <main className="mt-[60px] min-h-[calc(100vh-60px)] p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "EduEvents – Student Portal",
  description: "Event Management System for Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="flex min-h-screen bg-[#f0f6ff]">
          {/* Fixed Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 ml-64">
            {/* Fixed Header */}
            <Header />

            {/* Page Content */}
            <main className="mt-16 min-h-[calc(100vh-4rem)] p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

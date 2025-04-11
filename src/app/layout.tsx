import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SidebarNav } from "@/components/SidebarNav";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Data Science Workspace",
  description: "Talk to your data and challenge it with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <SidebarNav />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

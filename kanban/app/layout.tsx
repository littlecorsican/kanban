import ReactQueryProvider from "@/utils/provider";
import React from "react";
import "./globals.css";

export const metadata = {
  title: "Kanban Board",
  description: "React Kanban board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}



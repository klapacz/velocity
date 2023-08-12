"use client";

import { api } from "@/lib/client/api";

import "@/styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default api.withTRPC(RootLayout);

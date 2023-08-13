"use client";

import { api } from "@/lib/client/api";
import { ThemeProvider } from "@/lib/client/contexts/theme-context";

import "@/styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default api.withTRPC(RootLayout);

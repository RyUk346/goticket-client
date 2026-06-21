"use client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#1c2638", color: "#eceef2", border: "1px solid rgba(255,255,255,0.08)" },
          success: { iconTheme: { primary: "#f59e0b", secondary: "#0a0f1a" } },
        }}
      />
    </ThemeProvider>
  );
}
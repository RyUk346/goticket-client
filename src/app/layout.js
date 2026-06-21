import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: { default: "GoTicket — Book Bus, Train, Launch & Flight Tickets", template: "%s · GoTicket" },
  description: "Discover and book bus, train, launch and flight tickets with ease.",
};

export const viewport = { themeColor: "#0a0f1a" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
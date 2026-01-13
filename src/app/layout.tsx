import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daddy G.O. Simulator",
  description: "A satirical life simulation game about Nigerian megachurch culture. Build your ministry from bus stop preaching to mega-church empire.",
  keywords: ["game", "simulation", "Nigeria", "church", "BitLife", "pastor"],
  authors: [{ name: "Project Green" }],
  openGraph: {
    title: "Daddy G.O. Simulator",
    description: "From bus stop preacher to megachurch mogul. Will you keep the faith?",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#4CAF50",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

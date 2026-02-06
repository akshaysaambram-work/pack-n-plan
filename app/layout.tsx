import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { LoadingProvider } from "@/contexts/loading-context";
import { ModalProvider } from "@/contexts/modal-context";
import { NotificationProvider } from "@/contexts/notification-context";
import { OfflineProvider } from "@/contexts/offline-context";
import { PreferencesProvider } from "@/contexts/preferences-context";
import { SearchProvider } from "@/contexts/search-context";
import { ThemeProvider } from "@/contexts/theme-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PackNPlan",
  description: "AI-powered travel itinerary planner for personalized journeys",
  icons: {
    icon: `/api/favicon?stroke=blue`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <PreferencesProvider>
          <NotificationProvider>
            <ModalProvider>
              <LoadingProvider>
                <SearchProvider>
                  <OfflineProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                      <ThemeProvider>
                        <AuthProvider>
                          <div className="bg-background min-h-screen">
                            <Navigation />
                            <main className="container mx-auto px-4 py-6">
                              {children}
                            </main>
                          </div>
                          <Toaster />
                        </AuthProvider>
                      </ThemeProvider>
                    </Suspense>
                  </OfflineProvider>
                </SearchProvider>
              </LoadingProvider>
            </ModalProvider>
          </NotificationProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}

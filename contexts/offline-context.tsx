"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

interface OfflineContextType {
  isOnline: boolean;
}

const OfflineContext = createContext<OfflineContextType>({ isOnline: true });

export function OfflineProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    globalThis.addEventListener("online", handleOnline);
    globalThis.addEventListener("offline", handleOffline);

    return () => {
      globalThis.removeEventListener("online", handleOnline);
      globalThis.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <OfflineContext.Provider value={{ isOnline }}>
      {children}
      {!isOnline && (
        <div className="bg-destructive text-destructive-foreground fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg p-4">
          <WifiOff className="h-5 w-5" />
          <p className="text-sm font-medium">
            You are currently offline. Some features may be unavailable.
          </p>
        </div>
      )}
    </OfflineContext.Provider>
  );
}

export const useOffline = () => useContext(OfflineContext);

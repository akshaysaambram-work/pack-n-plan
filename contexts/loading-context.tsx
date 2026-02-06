"use client";

import { createContext, useContext, useState } from "react";
import { Loader } from "lucide-react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => null,
  startLoading: () => null,
  stopLoading: () => null,
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setLoading: setIsLoading, startLoading, stopLoading }}
    >
      {children}
      {isLoading && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);

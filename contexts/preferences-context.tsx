"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { createContext, useContext } from "react";

interface Preferences {
  language: string;
  currency: string;
  measurementUnit: "metric" | "imperial";
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (preferences: Partial<Preferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: Preferences = {
  language: "en",
  currency: "USD",
  measurementUnit: "metric",
  notifications: {
    email: true,
    push: true,
    marketing: false,
  },
};

const PreferencesContext = createContext<PreferencesContextType>({
  preferences: defaultPreferences,
  updatePreferences: () => null,
  resetPreferences: () => null,
});

export function PreferencesProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [preferences, setPreferences] = useLocalStorage<Preferences>(
    "user-preferences",
    defaultPreferences,
  );

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences({
      ...preferences,
      ...newPreferences,
    });
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider
      value={{ preferences, updatePreferences, resetPreferences }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);

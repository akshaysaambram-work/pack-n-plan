"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchContextType {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType>({
  searchTerm: "",
  debouncedSearchTerm: "",
  setSearchTerm: () => null,
  clearSearch: () => null,
  isSearching: false,
});

export function SearchProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setIsSearching(term.length > 0);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setIsSearching(false);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        debouncedSearchTerm,
        setSearchTerm: handleSearch,
        clearSearch,
        isSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);

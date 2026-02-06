import { useState, useEffect } from "react";

interface UseFetchOptions<T> {
  initialData?: T;
  dependencies?: any[];
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {},
): FetchState<T> {
  const { initialData, dependencies = [], onSuccess, onError } = options;
  const [state, setState] = useState<FetchState<T>>({
    data: initialData ?? null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setState({ data, error: null, isLoading: false });
          onSuccess?.(data);
        }
      } catch (error) {
        if (isMounted) {
          const errorObject =
            error instanceof Error ? error : new Error(String(error));
          setState({ data: null, error: errorObject, isLoading: false });
          onError?.(errorObject);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, ...dependencies]);

  return state;
}

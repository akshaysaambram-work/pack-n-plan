export const storage = {
  set: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      globalThis.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = globalThis.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  },

  remove: (key: string): void => {
    try {
      globalThis.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  clear: (): void => {
    try {
      globalThis.localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

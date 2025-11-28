// Utility functions untuk safe localStorage access
// Menghindari hydration mismatch dengan SSR

export const isClient = typeof window !== "undefined";

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from localStorage key "${key}":`, error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set item to localStorage key "${key}":`, error);
    }
  },

  removeItem: (key: string): void => {
    if (!isClient) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(
        `Failed to remove item from localStorage key "${key}":`,
        error
      );
    }
  },

  clear: (): void => {
    if (!isClient) return;
    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }
  },
};

export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    if (!isClient) return null;
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.warn(
        `Failed to get item from sessionStorage key "${key}":`,
        error
      );
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isClient) return;
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set item to sessionStorage key "${key}":`, error);
    }
  },

  removeItem: (key: string): void => {
    if (!isClient) return;
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn(
        `Failed to remove item from sessionStorage key "${key}":`,
        error
      );
    }
  },

  clear: (): void => {
    if (!isClient) return;
    try {
      sessionStorage.clear();
    } catch (error) {
      console.warn("Failed to clear sessionStorage:", error);
    }
  },
};

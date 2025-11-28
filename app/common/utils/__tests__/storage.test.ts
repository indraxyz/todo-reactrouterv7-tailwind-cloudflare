import { describe, it, expect, beforeEach, vi } from "vitest";
import { safeLocalStorage, safeSessionStorage, isClient } from "../storage";

describe("storage utilities", () => {
  beforeEach(() => {
    // Clear storage before each test
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  describe("isClient", () => {
    it("should return true in browser environment", () => {
      expect(isClient).toBe(true);
    });
  });

  describe("safeLocalStorage", () => {
    describe("getItem", () => {
      it("should return null for non-existent key", () => {
        expect(safeLocalStorage.getItem("non-existent")).toBeNull();
      });

      it("should return value for existing key", () => {
        localStorage.setItem("test-key", "test-value");
        expect(safeLocalStorage.getItem("test-key")).toBe("test-value");
      });

      it("should handle errors gracefully", () => {
        const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
        const originalGetItem = Storage.prototype.getItem;
        Storage.prototype.getItem = vi.fn(() => {
          throw new Error("Storage error");
        });

        expect(safeLocalStorage.getItem("test-key")).toBeNull();
        expect(consoleSpy).toHaveBeenCalled();

        Storage.prototype.getItem = originalGetItem;
        consoleSpy.mockRestore();
      });
    });

    describe("setItem", () => {
      it("should store value in localStorage", () => {
        safeLocalStorage.setItem("test-key", "test-value");
        expect(localStorage.getItem("test-key")).toBe("test-value");
      });

      it("should handle quota exceeded error gracefully", () => {
        const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
        const originalSetItem = Storage.prototype.setItem;
        Storage.prototype.setItem = vi.fn(() => {
          throw new DOMException("QuotaExceededError");
        });

        expect(() => {
          safeLocalStorage.setItem("test-key", "value");
        }).not.toThrow();
        expect(consoleSpy).toHaveBeenCalled();

        Storage.prototype.setItem = originalSetItem;
        consoleSpy.mockRestore();
      });
    });

    describe("removeItem", () => {
      it("should remove item from localStorage", () => {
        localStorage.setItem("test-key", "value");
        safeLocalStorage.removeItem("test-key");
        expect(localStorage.getItem("test-key")).toBeNull();
      });
    });

    describe("clear", () => {
      it("should clear all items from localStorage", () => {
        localStorage.setItem("key1", "value1");
        localStorage.setItem("key2", "value2");
        safeLocalStorage.clear();
        expect(localStorage.length).toBe(0);
      });
    });
  });

  describe("safeSessionStorage", () => {
    describe("getItem", () => {
      it("should return value for existing key", () => {
        sessionStorage.setItem("test-key", "test-value");
        expect(safeSessionStorage.getItem("test-key")).toBe("test-value");
      });
    });

    describe("setItem", () => {
      it("should store value in sessionStorage", () => {
        safeSessionStorage.setItem("test-key", "test-value");
        expect(sessionStorage.getItem("test-key")).toBe("test-value");
      });
    });
  });
});


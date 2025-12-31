
import { encryptData, decryptData } from "./crypto";

const STORAGE_PREFIX = "emerald_app_";

export const LocalStorage = {
  setItem: (key: string, value: any, encrypted: boolean = false) => {
    if (typeof window === "undefined") return;
    
    try {
      const storageKey = `${STORAGE_PREFIX}${key}`;
      const dataToStore = encrypted ? encryptData(value) : JSON.stringify(value);
      const metadata = {
        timestamp: new Date().getTime(),
        encrypted: encrypted,
        data: dataToStore
      };
      localStorage.setItem(storageKey, JSON.stringify(metadata));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  },

  getItem: (key: string) => {
    if (typeof window === "undefined") return null;

    try {
      const storageKey = `${STORAGE_PREFIX}${key}`;
      const item = localStorage.getItem(storageKey);
      
      if (!item) return null;

      const metadata = JSON.parse(item);
      
      if (metadata.encrypted) {
        return decryptData(metadata.data);
      } else {
        return JSON.parse(metadata.data);
      }
    } catch (error) {
      console.error("Error reading from local storage:", error);
      return null;
    }
  },

  removeItem: (key: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  },

  clear: () => {
    if (typeof window === "undefined") return;
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
};

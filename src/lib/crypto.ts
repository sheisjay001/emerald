
// Simple encryption utility for local storage
// In a real production app, use Web Crypto API (async) or a library like crypto-js

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "emerald-secret-key-2025";

export const encryptData = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    // Simple XOR encryption for demo purposes
    // (Real implementation would use AES-GCM)
    let result = "";
    for (let i = 0; i < jsonString.length; i++) {
      result += String.fromCharCode(jsonString.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return btoa(result); // Base64 encode
  } catch (error) {
    console.error("Encryption failed:", error);
    return "";
  }
};

export const decryptData = (cipherText: string): any => {
  try {
    const jsonString = atob(cipherText); // Base64 decode
    let result = "";
    for (let i = 0; i < jsonString.length; i++) {
      result += String.fromCharCode(jsonString.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
    }
    return JSON.parse(result);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

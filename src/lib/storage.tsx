import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export function getItem<T>(key: string): T | null {
  try {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  storage.delete(key);
}

export function clear(): void {
  storage.clearAll();
}

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = AsyncStorage;

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await storage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  await storage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key: string): Promise<void> {
  await storage.removeItem(key);
}

export async function clear(): Promise<void> {
  await storage.clear();
}

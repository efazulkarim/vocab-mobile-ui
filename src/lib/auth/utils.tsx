import { getItem, removeItem, setItem } from '@/lib/storage';

const TOKEN = 'token';

export type TokenType = {
  access: string;
  refresh: string;
};

export const getToken = async () => await getItem<TokenType>(TOKEN);
export const removeToken = async () => await removeItem(TOKEN);
export const setToken = async (value: TokenType) =>
  await setItem<TokenType>(TOKEN, value);

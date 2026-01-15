import { Env } from '@env';
import axios from 'axios';

import { getToken } from '@/lib/auth/utils';

export const client = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
client.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token?.access) {
        config.headers.Authorization = `Bearer ${token.access}`;
      }
    } catch (error) {
      // If we can't get the token, continue without it
      console.warn('Failed to get auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear token if it's invalid
      // Note: We don't automatically sign out here as it might cause issues
      // The UI should handle this and redirect to login
      console.warn('Auth token is invalid or expired');
    }
    return Promise.reject(error);
  }
);

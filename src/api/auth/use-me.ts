import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, UserResponse } from '../types';

export const useMe = createQuery<UserResponse, void, AxiosError<ApiError>>({
  queryKey: ['me'],
  fetcher: async () => {
    const response = await client.get('me');
    return response.data;
  },
});

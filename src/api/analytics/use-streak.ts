import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, StreakResponse } from '../types';

export const useStreak = createQuery<
  StreakResponse,
  void,
  AxiosError<ApiError>
>({
  queryKey: ['analytics', 'streak'],
  fetcher: async () => {
    const response = await client.get('v1/analytics/streak/');
    return response.data;
  },
});

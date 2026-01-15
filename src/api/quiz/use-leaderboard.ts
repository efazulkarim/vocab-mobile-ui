import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, LeaderboardResponse } from '../types';

type Variables = {
  period?: 'weekly' | 'monthly' | 'all_time';
  limit?: number;
};

export const useLeaderboard = createQuery<
  LeaderboardResponse,
  Variables,
  AxiosError<ApiError>
>({
  queryKey: ['quizzes', 'leaderboard'],
  fetcher: async (variables) => {
    const params = new URLSearchParams();

    if (variables?.period) {
      params.append('period', variables.period);
    }
    if (variables?.limit) {
      params.append('limit', String(variables.limit));
    }

    const queryString = params.toString();
    const url = queryString
      ? `v1/quizzes/leaderboard/?${queryString}`
      : 'v1/quizzes/leaderboard/';
    const response = await client.get(url);
    return response.data;
  },
});

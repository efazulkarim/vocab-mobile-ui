import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, UserQuizStats } from '../types';

export const useQuizStats = createQuery<
  UserQuizStats,
  void,
  AxiosError<ApiError>
>({
  queryKey: ['quizzes', 'stats'],
  fetcher: async () => {
    const response = await client.get('v1/quizzes/stats/');
    return response.data;
  },
});

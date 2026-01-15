import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, QuizHistoryResponse } from '../types';

type Variables = {
  page?: number;
  page_size?: number;
};

export const useQuizHistory = createQuery<
  QuizHistoryResponse,
  Variables,
  AxiosError<ApiError>
>({
  queryKey: ['quizzes', 'history'],
  fetcher: async (variables) => {
    const params = new URLSearchParams();

    if (variables?.page) {
      params.append('page', String(variables.page));
    }
    if (variables?.page_size) {
      params.append('page_size', String(variables.page_size));
    }

    const queryString = params.toString();
    const url = queryString
      ? `v1/quizzes/history/?${queryString}`
      : 'v1/quizzes/history/';
    const response = await client.get(url);
    return response.data;
  },
});

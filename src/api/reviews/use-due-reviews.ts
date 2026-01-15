import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, DueReviewsResponse } from '../types';

export const useDueReviews = createQuery<
  DueReviewsResponse,
  void,
  AxiosError<ApiError>
>({
  queryKey: ['reviews', 'due'],
  fetcher: async () => {
    const response = await client.get('v1/reviews/due/');
    return response.data;
  },
});

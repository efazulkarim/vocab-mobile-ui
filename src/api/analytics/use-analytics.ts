import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { AnalyticsResponse, ApiError } from '../types';

export const useAnalytics = createQuery<
  AnalyticsResponse,
  void,
  AxiosError<ApiError>
>({
  queryKey: ['analytics'],
  fetcher: async () => {
    const response = await client.get('v1/analytics/');
    return response.data;
  },
});

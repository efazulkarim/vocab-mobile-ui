import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, SubscriptionStatusResponse } from '../types';

export const useSubscriptionStatus = createQuery<
  SubscriptionStatusResponse,
  void,
  AxiosError<ApiError>
>({
  queryKey: ['subscription', 'status'],
  fetcher: async () => {
    const response = await client.get('webhooks/subscription-status/');
    return response.data;
  },
});

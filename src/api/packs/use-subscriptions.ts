import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, UserSubscriptionsResponse } from '../types';

export const useSubscriptions = createQuery<
  UserSubscriptionsResponse,
  void,
  AxiosError<ApiError>
>({
  queryKey: ['packs', 'subscriptions'],
  fetcher: async () => {
    const response = await client.get('v1/packs/subscriptions/');
    return response.data;
  },
});

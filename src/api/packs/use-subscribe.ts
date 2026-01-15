import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type {
  ApiError,
  SubscribeRequest,
  SubscriptionResponse,
} from '../types';

export const useSubscribe = createMutation<
  SubscriptionResponse,
  SubscribeRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('v1/packs/subscriptions/', variables);
    return response.data;
  },
});

import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { ApiError } from '../types';

type Variables = { packId: string };

export const useUnsubscribe = createMutation<
  void,
  Variables,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    await client.delete(`v1/packs/subscriptions/${variables.packId}/`);
  },
});

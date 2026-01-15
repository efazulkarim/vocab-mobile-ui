import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type {
  AddPackWordsRequest,
  AddPackWordsResponse,
  ApiError,
} from '../types';

export const useAddToBank = createMutation<
  AddPackWordsResponse,
  AddPackWordsRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('v1/packs/add-to-bank/', variables);
    return response.data;
  },
});

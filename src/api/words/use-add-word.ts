import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { AddWordRequest, ApiError, UserWordResponse } from '../types';

export const useAddWord = createMutation<
  UserWordResponse,
  AddWordRequest,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const response = await client.post('v1/words/', variables);
    return response.data;
  },
});

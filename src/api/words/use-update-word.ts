import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { ApiError, UpdateWordRequest, UserWordResponse } from '../types';

type Variables = UpdateWordRequest & { wordId: string };

export const useUpdateWord = createMutation<
  UserWordResponse,
  Variables,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    const { wordId, ...data } = variables;
    const response = await client.patch(`v1/words/${wordId}/`, data);
    return response.data;
  },
});

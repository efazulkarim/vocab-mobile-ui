import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { ApiError } from '../types';

type Variables = { wordId: string };

export const useDeleteWord = createMutation<
  void,
  Variables,
  AxiosError<ApiError>
>({
  mutationFn: async (variables) => {
    await client.delete(`v1/words/${variables.wordId}/`);
  },
});

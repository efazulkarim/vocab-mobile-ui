import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { WordGenerateResponse } from './types';

type Variables = { word: string };
type Response = WordGenerateResponse;

export const useGenerateWord = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    return client
      .post('v1/word/generate', { word: variables.word })
      .then((response) => response.data);
  },
});

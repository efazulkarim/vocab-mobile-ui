import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Word } from './types';

type Variables = { id: string };
type Response = Word;

export const useWordDetail = createQuery<Response, Variables, AxiosError>({
  queryKey: ['word'],
  fetcher: (variables) => {
    return client
      .get(`v1/words/${variables.id}/`)
      .then((response) => response.data);
  },
});

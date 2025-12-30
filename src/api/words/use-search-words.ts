import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { WordsListParams, WordsListResponse } from './types';

type Variables = WordsListParams;
type Response = WordsListResponse;

export const useSearchWords = createQuery<Response, Variables, AxiosError>({
  queryKey: ['words', 'search'],
  fetcher: (variables) => {
    const params = new URLSearchParams();

    if (variables.page) {
      params.append('page', String(variables.page));
    }
    if (variables.page_size) {
      params.append('page_size', String(variables.page_size));
    }
    if (variables.search) {
      params.append('search', variables.search);
    }
    if (variables.due_only) {
      params.append('due_only', 'true');
    }

    return client.get(`v1/words/?${params.toString()}`).then((res) => res.data);
  },
});

import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type {
  ApiError,
  WordPackListParams,
  WordPackListResponse,
} from '../types';

export const usePacks = createQuery<
  WordPackListResponse,
  WordPackListParams,
  AxiosError<ApiError>
>({
  queryKey: ['packs'],
  fetcher: async (variables) => {
    const params = new URLSearchParams();

    if (variables?.page) {
      params.append('page', String(variables.page));
    }
    if (variables?.page_size) {
      params.append('page_size', String(variables.page_size));
    }
    if (variables?.category) {
      params.append('category', variables.category);
    }
    if (variables?.difficulty) {
      params.append('difficulty', variables.difficulty);
    }
    if (variables?.search) {
      params.append('search', variables.search);
    }
    if (variables?.is_premium !== undefined) {
      params.append('is_premium', String(variables.is_premium));
    }

    const queryString = params.toString();
    const url = queryString ? `v1/packs/?${queryString}` : 'v1/packs/';
    const response = await client.get(url);
    return response.data;
  },
});
